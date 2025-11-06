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

// (Opcional: si usás este util en otros lados, lo dejamos tolerante)
let getDateWindow;
try { ({ getDateWindow } = require('../utils/getDateWindow')); }
catch { ({ getDateWindow } = require('../../utils/getDateWindow')); }

// =======================
// Estados de negocio
// =======================
const DONE_STATUSES   = ['PAID', 'DELIVERED', 'COMPLETED'];
const RETURN_STATUSES = ['CLAIMED', 'RETURNED']; // 👈 "CLAIMED" cuenta como devuelto
const CLAIM_STATUSES  = ['CLAIMED'];

// =======================
// Helpers de período
// =======================
function resolveMonths(period) {
  // Soporta: last1m | last3m | last6m | last12m | all | (compat) last30d / prev_month
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

// Case-insensitive IN para status
const ciStatusIn = (values) =>
  where(fn('LOWER', col('status')), { [Op.in]: values.map((v) => String(v).toLowerCase()) });

// =======================
// Servicio principal
// =======================
exports.getOverview = async ({
  commerceId,
  period = 'last3m',
  validStatuses = ['PAID', 'DELIVERED', 'COMPLETED'], // preset que llega del controller
  timezone = 'America/Argentina/Buenos_Aires',
}) => {
  // Ventana temporal
  const { startDate, endDate } = computeWindow(period);
  const useWindow = !!startDate;

  // Filtro base por comercio + status dinámico (preset)
  let statusCondition;
  if (validStatuses !== 'ALL' && Array.isArray(validStatuses) && validStatuses.length > 0) {
    const statusesLower = validStatuses.map((s) => String(s).toLowerCase());
    statusCondition = where(fn('LOWER', col('status')), { [Op.in]: statusesLower });
  }

  // ❗Separar filtros:
  // - baseFilterNoStatus: para KPIs que NO deben chocar con el preset (devueltos/reclamados/realizados)
  // - baseFilterWithStatus: para lo demás (ingresos, mensual, top3, etc.) que sí respeta el preset
  const baseFilterNoStatus = { commerce_id: commerceId };
  const baseFilterWithStatus = statusCondition
    ? { commerce_id: commerceId, [Op.and]: [statusCondition] }
    : { commerce_id: commerceId };

  // =======================
  // KPIs (filtrados por ventana)
  // =======================

  // Ingresos: respeta el preset de status
  const revenueWhere = {
    ...baseFilterWithStatus,
    ...between('created_at', startDate, endDate),
  };
  const totalRevenueRow = await Order.findOne({
    attributes: [[fn('COALESCE', fn('SUM', col('total_amount')), 0), 'revenue']],
    where: revenueWhere,
    raw: true,
  });
  const totalRevenue = Number(totalRevenueRow?.revenue ?? 0);

  // Pedidos realizados: NO depende del preset; usa DONE (case-insensitive)
  const totalOrders = await Order.count({
    where: {
      ...baseFilterNoStatus,
      ...between('created_at', startDate, endDate),
      [Op.and]: [ciStatusIn(DONE_STATUSES)],
    },
  });

  // Pedidos devueltos: NO depende del preset; usa RETURN (case-insensitive)
  const returnedOrders = await Order.count({
    where: {
      ...baseFilterNoStatus,
      ...between('created_at', startDate, endDate),
      [Op.and]: [ciStatusIn(RETURN_STATUSES)],
    },
  });

  // Productos vencidos: si hay ventana, vencidos cuyo expiration_date cae en la ventana; en "Histórico", vencidos por fecha (< ahora)
  const expiredRows = await Publication.findAll({
    attributes: [[fn('COALESCE', fn('SUM', col('available_stock')), 0), 'expiredStock']],
    where: {
      commerce_id: commerceId,
      ...(useWindow
        ? { expiration_date: { [Op.between]: [startDate, endDate] } }
        : { expiration_date: { [Op.lt]: new Date() } }),
    },
    raw: true,
  });
  const expiredProducts = Number(expiredRows?.[0]?.expiredStock ?? 0);

  // =======================
  // IDs de órdenes del período (para joins / tortas / top3)
  // Por defecto: respeta el preset (baseFilterWithStatus)
  // =======================
  const orderIdsRows = await Order.findAll({
    attributes: ['id'],
    where: {
      ...baseFilterWithStatus,
      ...between('created_at', startDate, endDate),
    },
    raw: true,
  });
  const orderIds = orderIdsRows.map((r) => r.id);

  // =======================
  // Barras: Top 3 productos por unidades (ventana + preset)
  // =======================
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

  // =======================
  // Tortas
  // =======================

  // Productos: vendidos (ventana + preset) vs vencidos (arriba)
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

  // Pedidos: realizados (ya calculado) vs reclamados (NO depende del preset; case-insensitive)
  const claimedOrders = await Order.count({
    where: {
      ...baseFilterNoStatus,
      ...between('created_at', startDate, endDate),
      [Op.and]: [ciStatusIn(CLAIM_STATUSES)],
    },
  });
  const completedOrders = Math.max(0, Number(totalOrders));

  // =======================
  // Histórico por mes (línea/área)
  // =======================
  const { months } = resolveMonths(period);
  const monthExpr = fn('DATE_FORMAT', col('created_at'), '%Y-%m-01'); // yyyy-mm-01
  const monthlyWhere = {
    ...baseFilterWithStatus, // respeta preset
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
  const totalMonths = months || 12; // en "Histórico", mostramos últimos 12 meses por sanidad de UI
  for (let i = totalMonths - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = monthKey(d);
    salesByMonth.push(monthMap[key] ?? { month: key, ordersCount: 0, totalAmount: 0 });
  }

  // =======================
  // Respuesta
  // =======================
  return {
    // KPIs (período seleccionado)
    totalRevenue,
    totalOrders,
    returnedOrders,
    expiredProducts,

    // Gráficos
    topProductsBar,                                         // barras (Top 3)
    pieProducts: { soldUnits, expiredUnits: expiredProducts }, // torta productos
    pieOrders: { completedOrders, claimedOrders },             // torta pedidos
    salesByMonth,                                           // meses según período (o 12 en "all")
  };
};
