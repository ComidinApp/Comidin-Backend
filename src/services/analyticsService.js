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

let getDateWindow;
try { ({ getDateWindow } = require('../utils/getDateWindow')); }
catch { ({ getDateWindow } = require('../../utils/getDateWindow')); }

// Estados (según lo que definiste)
const DONE_STATUSES = ['PAID', 'DELIVERED', 'COMPLETED'];
const RETURN_STATUSES = ['CLAIMED', 'RETURNED'];
const CLAIM_STATUSES = ['CLAIMED']; // para la torta de "reclamados"

// ----- Helpers de ventana temporal -----
function resolveMonths(period) {
  // Acepta: last1m | last3m | last6m | last12m | last30d | prev_month | all
  const p = String(period || '').toLowerCase();

  if (p === 'all') return { mode: 'all', months: 0 };

  if (p === 'last30d' || p === 'last1m') return { mode: 'months', months: 1 };
  if (p === 'last3m') return { mode: 'months', months: 3 };
  if (p === 'last6m') return { mode: 'months', months: 6 };
  if (p === 'last12m' || p === 'prev_month') return { mode: 'months', months: 12 };

  // fallback sensato
  return { mode: 'months', months: 3 };
}

function computeWindow(period) {
  // Si existe util getDateWindow (tuyo), úsalo en 'last30d'/'prev_month'.
  const { mode, months } = resolveMonths(period);

  if (mode === 'all') {
    return { startDate: null, endDate: new Date() };
  }

  // Ventana "últimos N meses" (incluye el mes corriente, hasta ahora)
  const endDate = new Date();
  const startDate = new Date(endDate.getFullYear(), endDate.getMonth() - (months - 1), 1);
  return { startDate, endDate };
}

function between(field, startDate, endDate) {
  if (!startDate) return {};
  return { [field]: { [Op.between]: [startDate, endDate] } };
}

function monthKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

exports.getOverview = async ({
  commerceId,
  period = 'last3m', // default nuevo
  validStatuses = ['PAID', 'DELIVERED', 'COMPLETED'],
  timezone = 'America/Argentina/Buenos_Aires',
}) => {
  // Ventana temporal
  const { startDate, endDate } = computeWindow(period);
  const useWindow = !!startDate;

  // Filtro base por comercio + status dinámico
  let statusCondition;
  if (validStatuses !== 'ALL' && Array.isArray(validStatuses) && validStatuses.length > 0) {
    const statusesLower = validStatuses.map((s) => String(s).toLowerCase());
    statusCondition = where(fn('LOWER', col('status')), { [Op.in]: statusesLower });
  }
  const baseFilter = { commerce_id: commerceId };
  if (statusCondition) {
    baseFilter[Op.and] = baseFilter[Op.and] ? [baseFilter[Op.and], statusCondition] : [statusCondition];
  }

  // ===== KPIs (filtrados por ventana temporal) =====
  const revenueWhere = {
    ...baseFilter,
    ...between('created_at', startDate, endDate),
  };
  const totalRevenueRow = await Order.findOne({
    attributes: [[fn('COALESCE', fn('SUM', col('total_amount')), 0), 'revenue']],
    where: revenueWhere,
    raw: true,
  });
  const totalRevenue = Number(totalRevenueRow?.revenue ?? 0);

  const totalOrders = await Order.count({
    where: {
      ...baseFilter,
      ...between('created_at', startDate, endDate),
      status: { [Op.in]: DONE_STATUSES },
    },
  });

  const returnedOrders = await Order.count({
    where: {
      ...baseFilter,
      ...between('created_at', startDate, endDate),
      status: { [Op.in]: RETURN_STATUSES },
    },
  });

  // Productos vencidos en la ventana (fecha de vencimiento dentro del rango)
  const expiredRows = await Publication.findAll({
    attributes: [[fn('COALESCE', fn('SUM', col('available_stock')), 0), 'expiredStock']],
    where: {
      commerce_id: commerceId,
      ...(useWindow
        ? { expiration_date: { [Op.between]: [startDate, endDate] } }
        : { expiration_date: { [Op.lt]: new Date() } }), // si "all" mantenemos tu criterio original
    },
    raw: true,
  });
  const expiredProducts = Number(expiredRows?.[0]?.expiredStock ?? 0);

  // ===== IDs de órdenes del período =====
  const orderIdsRows = await Order.findAll({
    attributes: ['id'],
    where: {
      ...baseFilter,
      ...between('created_at', startDate, endDate),
    },
    raw: true,
  });
  const orderIds = orderIdsRows.map((r) => r.id);

  // ===== Barras: Top 3 productos por unidades (en la ventana) =====
  let topProductsBar = [];
  if (orderIds.length) {
    const top3Raw = await OrderDetail.findAll({
      attributes: [
        [col('publication->product.name'), 'productName'],
        [fn('SUM', col('quantity')), 'units'],
      ],
      where: {
        order_id: { [Op.in]: orderIds },
        ...between('created_at', startDate, endDate),
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

  // ===== Tortas =====
  const soldUnitsRow = orderIds.length
    ? await OrderDetail.findOne({
        attributes: [[fn('COALESCE', fn('SUM', col('quantity')), 0), 'sold']],
        where: {
          order_id: { [Op.in]: orderIds },
          ...between('created_at', startDate, endDate),
        },
        raw: true,
      })
    : { sold: 0 };
  const soldUnits = Number(soldUnitsRow?.sold ?? 0);

  const claimedOrders = await Order.count({
    where: {
      ...baseFilter,
      ...between('created_at', startDate, endDate),
      status: { [Op.in]: CLAIM_STATUSES },
    },
  });

  const completedOrders = Math.max(0, Number(totalOrders));

  // ===== Histórico por mes (N = meses de la ventana) =====
  const { months } = resolveMonths(period);
  const monthExpr = fn('DATE_FORMAT', col('created_at'), '%Y-%m-01'); // yyyy-mm-01
  const monthlyWhere = {
    ...baseFilter,
    ...between('created_at', startDate, endDate),
  };

  const monthlyRows = await Order.findAll({
    attributes: [
      [monthExpr, 'month'],
      [fn('COUNT', col('id')), 'ordersCount'],
      [fn('COALESCE', fn('SUM', col('total_amount')), 0), 'totalAmount'],
    ],
    where: monthlyWhere,
    group: [literal("DATE_FORMAT(created_at, '%Y-%m-01')")],
    order: [literal("DATE_FORMAT(created_at, '%Y-%m-01') ASC")],
    raw: true,
  });

  const monthMap = {};
  monthlyRows.forEach((row) => {
    const month = new Date(row.month);
    const key = monthKey(month);
    monthMap[key] = {
      month: key,
      ordersCount: Number(row.ordersCount ?? 0),
      totalAmount: Number(row.totalAmount ?? 0),
    };
  });

  const now = new Date();
  const salesByMonth = [];
  const totalMonths = months || 12; // si por algún motivo llegó 0, asegurar algo
  for (let i = totalMonths - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = monthKey(d);
    salesByMonth.push(monthMap[key] ?? { month: key, ordersCount: 0, totalAmount: 0 });
  }

  // ===== Respuesta =====
  return {
    // KPIs (filtrados por período)
    totalRevenue,
    totalOrders,
    returnedOrders,
    expiredProducts,

    // Gráficos
    topProductsBar, // barras (Top 3)
    pieProducts: { soldUnits, expiredUnits: expiredProducts }, // torta productos
    pieOrders: { completedOrders, claimedOrders },             // torta pedidos
    salesByMonth, // meses según período seleccionado
  };
};
