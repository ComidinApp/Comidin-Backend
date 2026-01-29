// src/services/analyticsService.js
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
const DONE_STATUSES = ['DELIVERED', 'COMPLETED'];

// "devuelto o reclamado" => siempre cuenta como "reclamado"
const CLAIM_GROUP_STATUSES = ['CLAIMED', 'RETURNED'];

// (opcional) devueltos reales
const RETURN_STATUSES = ['RETURNED'];

// Case-insensitive IN para status
const ciStatusIn = (values) =>
  where(fn('LOWER', col('status')), {
    [Op.in]: values.map((v) => String(v).toLowerCase()),
  });

// =======================
// Helpers de fecha (SIN timezone)
// =======================
function pad2(n) { return String(n).padStart(2, '0'); }
function toMysqlDateTime(d) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;
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
    return { start: toMysqlDateTime(start), end: toMysqlDateTime(now), monthsForSeries: 1, mode: 'this_month' };
  }

  if (cfg.mode === 'prev_month') {
    const start = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0);
    const end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
    return { start: toMysqlDateTime(start), end: toMysqlDateTime(end), monthsForSeries: 1, mode: 'prev_month' };
  }

  if (cfg.mode === 'days') {
    const start = new Date(now);
    start.setDate(start.getDate() - (cfg.days - 1));
    start.setHours(0, 0, 0, 0);
    return { start: toMysqlDateTime(start), end: toMysqlDateTime(now), monthsForSeries: 1, mode: 'days' };
  }

  const start = new Date(now.getFullYear(), now.getMonth() - (cfg.months - 1), 1, 0, 0, 0);
  return { start: toMysqlDateTime(start), end: toMysqlDateTime(now), monthsForSeries: cfg.months, mode: 'months' };
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
  validStatuses = ['DELIVERED', 'COMPLETED'], // se mantiene por compatibilidad
} = {}) => {
  const { start, end, monthsForSeries, mode } = computeWindow(period);
  const useWindow = !!start;

  // Preset opcional (si alguna métrica querés filtrarla por preset)
  let statusCondition;
  if (validStatuses !== 'ALL' && Array.isArray(validStatuses) && validStatuses.length > 0) {
    statusCondition = ciStatusIn(validStatuses);
  }

  const baseFilterNoStatus = { commerce_id: commerceId };

  // ✅ FILTRO CANÓNICO PARA "VENDIDO" (NO depende de presets)
  const baseFilterSold = {
    commerce_id: commerceId,
    [Op.and]: [ciStatusIn(DONE_STATUSES)],
  };

  // Si alguna métrica querés que respete el preset, queda acá:
  const baseFilterWithPreset = statusCondition
    ? { commerce_id: commerceId, [Op.and]: [statusCondition] }
    : { commerce_id: commerceId };

  const dateFilter = useWindow
    ? { created_at: { [Op.between]: [start, end] } }
    : {};

  // =======================
  // KPIs
  // =======================

  // ✅ Revenue CANÓNICO: vendido = DONE
  const totalRevenueRow = await Order.findOne({
    attributes: [[fn('COALESCE', fn('SUM', col('total_amount')), 0), 'revenue']],
    where: { ...baseFilterSold, ...dateFilter },
    raw: true,
  });
  const totalRevenue = Number(totalRevenueRow?.revenue ?? 0);

  // ✅ Total orders CANÓNICO: vendido = DONE
  const totalOrders = await Order.count({
    where: {
      ...baseFilterNoStatus,
      ...dateFilter,
      [Op.and]: [ciStatusIn(DONE_STATUSES)],
    },
  });

  // Reclamados (grupo)
  const claimedOrders = await Order.count({
    where: {
      ...baseFilterNoStatus,
      ...dateFilter,
      [Op.and]: [ciStatusIn(CLAIM_GROUP_STATUSES)],
    },
  });

  // Devueltos reales
  const returnedOrders = await Order.count({
    where: {
      ...baseFilterNoStatus,
      ...dateFilter,
      [Op.and]: [ciStatusIn(RETURN_STATUSES)],
    },
  });

  // =======================
  // ✅ Productos vencidos SOLO del período seleccionado
  // (Si period = all, NO devolvemos histórico porque vos NO lo querés)
  // =======================
  let expiredProducts = 0;

  if (useWindow) {
    const expiredRow = await Publication.findOne({
      attributes: [[fn('COALESCE', fn('SUM', col('available_stock')), 0), 'expiredStock']],
      where: {
        commerce_id: commerceId,
        expiration_date: {
          [Op.between]: [start, end],
          [Op.lt]: literal('NOW()'),
        },
      },
      raw: true,
    });
    expiredProducts = Number(expiredRow?.expiredStock ?? 0);
  } else {
    // period=all => histórico. Como NO lo querés, lo apagamos.
    expiredProducts = 0; // o null si preferís diferenciar "no aplica"
  }

  // =======================
  // IDs de órdenes del período (para top3 y vendidos)
  // ✅ CANÓNICO: solo DONE
  // =======================
  const soldOrderIdsRows = await Order.findAll({
    attributes: ['id'],
    where: { ...baseFilterSold, ...dateFilter },
    raw: true,
  });
  const soldOrderIds = soldOrderIdsRows.map((r) => r.id);

  // =======================
  // Top 3 productos por unidades
  // =======================
  let topProductsBar = [];
  if (soldOrderIds.length) {
    const top3Raw = await OrderDetail.findAll({
      attributes: [
        [col('publication->product.name'), 'productName'],
        [fn('SUM', col('quantity')), 'units'],
      ],
      where: {
        order_id: { [Op.in]: soldOrderIds },
      },
      include: [
        {
          model: Publication,
          as: 'publication',
          attributes: [],
          required: true,
          include: [{ model: Product, as: 'product', attributes: [], required: false }],
        },
      ],
      group: [col('publication->product.name')],
      order: [[fn('SUM', col('quantity')), 'DESC']],
      limit: 3,
      raw: true,
    });

    topProductsBar = top3Raw.map((r) => ({
      productName: r.productName ?? 'Desconocido',
      units: Number(r.units ?? 0),
    }));
  }

  // =======================
  // Pie productos: vendidos vs vencidos
  // =======================
  const soldUnitsRow = soldOrderIds.length
    ? await OrderDetail.findOne({
        attributes: [[fn('COALESCE', fn('SUM', col('quantity')), 0), 'sold']],
        where: { order_id: { [Op.in]: soldOrderIds } },
        raw: true,
      })
    : { sold: 0 };
  const soldUnits = Number(soldUnitsRow?.sold ?? 0);

  // =======================
  // Histórico mensual
  // ✅ CANÓNICO: vendido = DONE
  // =======================
  const monthExpr = literal(`DATE_FORMAT(created_at, '%Y-%m-01')`);

  const monthlyRows = await Order.findAll({
    attributes: [
      [monthExpr, 'month'],
      [fn('COUNT', col('id')), 'ordersCount'],
      [fn('COALESCE', fn('SUM', col('total_amount')), 0), 'totalAmount'],
    ],
    where: { ...baseFilterSold, ...dateFilter },
    group: [monthExpr],
    order: [monthExpr],
    raw: true,
  });

  const monthMap = {};
  monthlyRows.forEach((row) => {
    const key = monthKeyFromYYYYMM01(row.month);
    monthMap[key] = {
      month: key,
      ordersCount: Number(row.ordersCount ?? 0),
      totalAmount: Number(row.totalAmount ?? 0),
    };
  });

  const now = new Date();
  const totalMonths = mode === 'all' ? 12 : (monthsForSeries || 12);

  const salesByMonth = [];
  for (let i = totalMonths - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${pad2(d.getMonth() + 1)}`;
    salesByMonth.push(monthMap[key] ?? { month: key, ordersCount: 0, totalAmount: 0 });
  }

  // =======================
  // Respuesta
  // =======================
  return {
    totalRevenue,
    totalOrders,
    claimedOrders,
    returnedOrders,
    expiredProducts,

    topProductsBar,
    pieProducts: { soldUnits, expiredUnits: expiredProducts },

    pieOrders: { completedOrders: totalOrders, claimedOrders },
    salesByMonth,

    _meta: {
      period,
      validStatusesPreset: validStatuses,
      soldDefinition: DONE_STATUSES,
      expiredDefinition: useWindow ? 'expiration_date in window' : 'disabled_for_all',
    },
  };
};
