const { Op, fn, col, literal, where } = require('sequelize');

let Models;
try { Models = require('../models'); } catch { Models = require('../../models'); }

const {
  order: Order,
  order_detail: OrderDetail,
  publication: Publication,
  product: Product,
} = Models;

// =======================
// Estados de negocio
// =======================
const DONE_STATUSES = ['PAID', 'DELIVERED', 'COMPLETED'];
const CLAIM_GROUP_STATUSES = ['CLAIMED', 'RETURNED'];
const RETURN_STATUSES = ['RETURNED'];

// Case-insensitive IN para status
const ciStatusIn = (values) =>
  where(fn('LOWER', col('status')), {
    [Op.in]: values.map((v) => String(v).toLowerCase()),
  });

// =======================
// Helpers de fecha (SIN TIMEZONE)
// =======================
function pad2(n) {
  return String(n).padStart(2, '0');
}

function toMysqlDateTime(d) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${pad2(
    d.getHours()
  )}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;
}

function resolvePeriod(period) {
  const p = String(period || '').toLowerCase();

  if (p === 'all') return { mode: 'all' };
  if (p === 'this_month' || p === 'last1m') return { mode: 'this_month' };
  if (p === 'last30d') return { mode: 'days', days: 30 };
  if (p === 'last3m') return { mode: 'months', months: 3 };
  if (p === 'last6m') return { mode: 'months', months: 6 };
  if (p === 'last12m') return { mode: 'months', months: 12 };
  if (p === 'prev_month') return { mode: 'prev_month' };

  return { mode: 'months', months: 3 };
}

function computeWindow(period) {
  const cfg = resolvePeriod(period);
  const now = new Date();

  if (cfg.mode === 'all') {
    return { start: null, end: toMysqlDateTime(now), monthsForSeries: 12, mode: 'all' };
  }

  if (cfg.mode === 'this_month') {
    const start = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);
    return { start: toMysqlDateTime(start), end: toMysqlDateTime(now), monthsForSeries: 1 };
  }

  if (cfg.mode === 'prev_month') {
    const start = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0);
    const end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
    return { start: toMysqlDateTime(start), end: toMysqlDateTime(end), monthsForSeries: 1 };
  }

  if (cfg.mode === 'days') {
    const start = new Date(now);
    start.setDate(start.getDate() - (cfg.days - 1));
    start.setHours(0, 0, 0, 0);
    return { start: toMysqlDateTime(start), end: toMysqlDateTime(now), monthsForSeries: 1 };
  }

  const start = new Date(now.getFullYear(), now.getMonth() - (cfg.months - 1), 1, 0, 0, 0);
  return { start: toMysqlDateTime(start), end: toMysqlDateTime(now), monthsForSeries: cfg.months };
}

function monthKeyFromYYYYMM01(v) {
  return String(v).slice(0, 7);
}

// =======================
// Servicio principal
// =======================
exports.getOverview = async ({
  commerceId,
  period = 'last3m',
  validStatuses = ['PAID', 'DELIVERED', 'COMPLETED'],
} = {}) => {
  const { start, end, monthsForSeries, mode } = computeWindow(period);
  const useWindow = !!start;

  let statusCondition;
  if (validStatuses !== 'ALL' && Array.isArray(validStatuses) && validStatuses.length > 0) {
    statusCondition = ciStatusIn(validStatuses);
  }

  const baseFilterNoStatus = { commerce_id: commerceId };
  const baseFilterWithStatus = statusCondition
    ? { commerce_id: commerceId, [Op.and]: [statusCondition] }
    : { commerce_id: commerceId };

  const dateFilter = useWindow
    ? { created_at: { [Op.between]: [start, end] } }
    : {};

  // =======================
  // KPIs
  // =======================
  const totalRevenueRow = await Order.findOne({
    attributes: [[fn('COALESCE', fn('SUM', col('total_amount')), 0), 'revenue']],
    where: { ...baseFilterWithStatus, ...dateFilter },
    raw: true,
  });

  const totalOrders = await Order.count({
    where: {
      ...baseFilterNoStatus,
      ...dateFilter,
      [Op.and]: [ciStatusIn(DONE_STATUSES)],
    },
  });

  const claimedOrders = await Order.count({
    where: {
      ...baseFilterNoStatus,
      ...dateFilter,
      [Op.and]: [ciStatusIn(CLAIM_GROUP_STATUSES)],
    },
  });

  const returnedOrders = await Order.count({
    where: {
      ...baseFilterNoStatus,
      ...dateFilter,
      [Op.and]: [ciStatusIn(RETURN_STATUSES)],
    },
  });

  const expiredRows = await Publication.findAll({
    attributes: [[fn('COALESCE', fn('SUM', col('available_stock')), 0), 'expiredStock']],
    where: {
      commerce_id: commerceId,
      ...(useWindow
        ? { expiration_date: { [Op.between]: [start, end] } }
        : { expiration_date: { [Op.lt]: literal('NOW()') } }),
    },
    raw: true,
  });

  const expiredProducts = Number(expiredRows?.[0]?.expiredStock ?? 0);

  // =======================
  // Histórico mensual
  // =======================
  const monthExpr = literal(`DATE_FORMAT(created_at, '%Y-%m-01')`);

  const monthlyRows = await Order.findAll({
    attributes: [
      [monthExpr, 'month'],
      [fn('COUNT', col('id')), 'ordersCount'],
      [fn('COALESCE', fn('SUM', col('total_amount')), 0), 'totalAmount'],
    ],
    where: { ...baseFilterWithStatus, ...dateFilter },
    group: [monthExpr],
    order: [monthExpr],
    raw: true,
  });

  const monthMap = {};
  monthlyRows.forEach((r) => {
    const key = monthKeyFromYYYYMM01(r.month);
    monthMap[key] = {
      month: key,
      ordersCount: Number(r.ordersCount),
      totalAmount: Number(r.totalAmount),
    };
  });

  const now = new Date();
  const totalMonths = mode === 'all' ? 12 : monthsForSeries;

  const salesByMonth = [];
  for (let i = totalMonths - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${pad2(d.getMonth() + 1)}`;
    salesByMonth.push(monthMap[key] ?? { month: key, ordersCount: 0, totalAmount: 0 });
  }

  return {
    totalRevenue: Number(totalRevenueRow?.revenue ?? 0),
    totalOrders,
    claimedOrders,
    returnedOrders,
    expiredProducts,
    pieOrders: { completedOrders: totalOrders, claimedOrders },
    salesByMonth,
  };
};
