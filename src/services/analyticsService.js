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
const DONE_STATUSES   = ['PAID', 'DELIVERED', 'COMPLETED'];

// ✅ Pedido del usuario:
// "no importa si es devuelto o reclamado siempre los agrupe en reclamado"
const CLAIM_GROUP_STATUSES = ['CLAIMED', 'RETURNED']; // 👈 agrupación única "reclamado"

// Si igual querés conservar el KPI "devueltos" real, lo dejamos separado:
const RETURN_STATUSES = ['RETURNED']; // devuelto efectivo (opcional KPI)

// Case-insensitive IN para status (robusto)
const ciStatusIn = (values) =>
  where(fn('LOWER', col('status')), { [Op.in]: values.map((v) => String(v).toLowerCase()) });

// =======================
// Timezone robusto (MySQL)
// =======================
//
// MySQL DATETIME no guarda TZ. Para evitar que "hoy" caiga en mes anterior,
// hacemos TODO el filtrado y agrupación en "horario AR" consistente.
//
// 👇 CONFIGURACIÓN CLAVE:
//
// Si tu DB guarda timestamps en UTC (recomendado):
//   DB_TZ_OFFSET = '+00:00'
//
// Si tu DB guarda timestamps en hora Argentina (AR):
//   DB_TZ_OFFSET = '-03:00'
//
// Yo dejo default UTC->AR porque es lo más común con backends modernos.
const DB_TZ_OFFSET = process.env.DB_TZ_OFFSET || '+00:00';
const AR_TZ_OFFSET = '-03:00';

// Expresión MySQL: created_at convertido a horario Argentina
// (CONVERT_TZ con offsets funciona incluso si MySQL no tiene tz tables cargadas)
const createdAtARExpr = () =>
  literal(`CONVERT_TZ(created_at, '${DB_TZ_OFFSET}', '${AR_TZ_OFFSET}')`);

// Helper: where(expr BETWEEN start AND end)
function betweenExpr(exprLiteral, start, end) {
  if (!start) return null;
  return where(exprLiteral, { [Op.between]: [start, end] });
}

// Formatear DATETIME string "YYYY-MM-DD HH:mm:ss" (MySQL-friendly)
function pad2(n) { return String(n).padStart(2, '0'); }
function toMysqlDateTime(d) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;
}

// "Ahora" en AR (sin libs externas):
// Tomamos UTC y aplicamos offset -03:00 fijo.
// (Argentina actualmente no usa DST; si eso cambia, conviene Luxon/Day.js + tzdb)
function nowInAR() {
  const nowUtc = new Date();
  // AR = UTC-3
  const arMs = nowUtc.getTime() - (3 * 60 * 60 * 1000);
  return new Date(arMs);
}

// Construir ventana temporal en horario AR (lo pasamos como strings a MySQL)
function resolvePeriod(period) {
  const p = String(period || '').toLowerCase();

  if (p === 'all') return { mode: 'all' };
  if (p === 'this_month' || p === 'last1m') return { mode: 'this_month' };

  // ✅ rolling 30 días real
  if (p === 'last30d') return { mode: 'days', days: 30 };

  if (p === 'last3m') return { mode: 'months', months: 3 };
  if (p === 'last6m') return { mode: 'months', months: 6 };
  if (p === 'last12m') return { mode: 'months', months: 12 };

  // ✅ prev_month real (mes calendario anterior)
  if (p === 'prev_month') return { mode: 'prev_month' };

  // fallback
  return { mode: 'months', months: 3 };
}

// Ventana en horario AR (strings MySQL)
function computeWindowAR(period) {
  const cfg = resolvePeriod(period);
  const endAR = nowInAR();

  // Histórico / all
  if (cfg.mode === 'all') {
    return { start: null, end: toMysqlDateTime(endAR), monthsForSeries: 12, mode: 'all' };
  }

  if (cfg.mode === 'this_month') {
    const start = new Date(endAR.getFullYear(), endAR.getMonth(), 1, 0, 0, 0);
    return {
      start: toMysqlDateTime(start),
      end: toMysqlDateTime(endAR),
      monthsForSeries: 1,
      mode: 'this_month',
    };
  }

  if (cfg.mode === 'prev_month') {
    const start = new Date(endAR.getFullYear(), endAR.getMonth() - 1, 1, 0, 0, 0);
    const end = new Date(endAR.getFullYear(), endAR.getMonth(), 0, 23, 59, 59); // último día mes anterior
    return {
      start: toMysqlDateTime(start),
      end: toMysqlDateTime(end),
      monthsForSeries: 1,
      mode: 'prev_month',
    };
  }

  if (cfg.mode === 'days') {
    const start = new Date(endAR);
    start.setDate(start.getDate() - (cfg.days - 1));
    start.setHours(0, 0, 0, 0);
    return {
      start: toMysqlDateTime(start),
      end: toMysqlDateTime(endAR),
      monthsForSeries: 1,
      mode: 'days',
    };
  }

  // últimos N meses (incluye mes actual, desde día 1 del mes de arranque)
  if (cfg.mode === 'months') {
    const start = new Date(endAR.getFullYear(), endAR.getMonth() - (cfg.months - 1), 1, 0, 0, 0);
    return {
      start: toMysqlDateTime(start),
      end: toMysqlDateTime(endAR),
      monthsForSeries: cfg.months,
      mode: 'months',
    };
  }

  // fallback
  const start = new Date(endAR.getFullYear(), endAR.getMonth() - 2, 1, 0, 0, 0);
  return {
    start: toMysqlDateTime(start),
    end: toMysqlDateTime(endAR),
    monthsForSeries: 3,
    mode: 'months',
  };
}

function monthKeyFromYYYYMM01(yyyyMm01) {
  // yyyy-mm-01 -> yyyy-mm
  return String(yyyyMm01).slice(0, 7);
}

// =======================
// Servicio principal
// =======================
exports.getOverview = async ({
  commerceId,
  period = 'last3m',
  validStatuses = ['PAID', 'DELIVERED', 'COMPLETED'],
  timezone = 'America/Argentina/Buenos_Aires', // se mantiene por compat, pero acá trabajamos por offset AR
} = {}) => {
  // Ventana temporal (en AR)
  const { start, end, monthsForSeries, mode } = computeWindowAR(period);
  const useWindow = !!start;

  // Base filters
  let statusCondition;
  if (validStatuses !== 'ALL' && Array.isArray(validStatuses) && validStatuses.length > 0) {
    const statusesLower = validStatuses.map((s) => String(s).toLowerCase());
    statusCondition = where(fn('LOWER', col('status')), { [Op.in]: statusesLower });
  }

  // Separar filtros:
  // - baseFilterNoStatus: KPIs que NO dependen del preset (realizados/reclamados/devueltos)
  // - baseFilterWithStatus: métricas que SÍ respetan preset (ingresos, mensual, top3, etc.)
  const baseFilterNoStatus = { commerce_id: commerceId };
  const baseFilterWithStatus = statusCondition
    ? { commerce_id: commerceId, [Op.and]: [statusCondition] }
    : { commerce_id: commerceId };

  // Condición de ventana usando created_at en AR
  const windowCond = useWindow ? betweenExpr(createdAtARExpr(), start, end) : null;

  // =======================
  // KPIs
  // =======================

  // Ingresos: respeta preset + ventana AR
  const totalRevenueRow = await Order.findOne({
    attributes: [[fn('COALESCE', fn('SUM', col('total_amount')), 0), 'revenue']],
    where: {
      ...baseFilterWithStatus,
      ...(windowCond ? { [Op.and]: [windowCond] } : {}),
    },
    raw: true,
  });
  const totalRevenue = Number(totalRevenueRow?.revenue ?? 0);

  // Pedidos realizados: NO depende del preset; usa DONE + ventana AR
  const totalOrders = await Order.count({
    where: {
      ...baseFilterNoStatus,
      [Op.and]: [
        ...(windowCond ? [windowCond] : []),
        ciStatusIn(DONE_STATUSES),
      ],
    },
  });

  // ✅ "Reclamados" = CLAIMED + RETURNED (agrupación única) + ventana AR
  const claimedOrders = await Order.count({
    where: {
      ...baseFilterNoStatus,
      [Op.and]: [
        ...(windowCond ? [windowCond] : []),
        ciStatusIn(CLAIM_GROUP_STATUSES),
      ],
    },
  });

  // (Opcional) Devueltos reales (solo RETURNED). Si no lo querés mostrar, podés eliminarlo del response.
  const returnedOrders = await Order.count({
    where: {
      ...baseFilterNoStatus,
      [Op.and]: [
        ...(windowCond ? [windowCond] : []),
        ciStatusIn(RETURN_STATUSES),
      ],
    },
  });

  // Productos vencidos:
  // Nota: si expiration_date es DATETIME también, ideal convertirlo igual.
  // Lo dejo simple asumiendo que expiration_date refleja la fecha "local" del negocio.
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
  // IDs de órdenes del período (para joins / tortas / top3)
  // Respeta preset + ventana AR
  // =======================
  const orderIdsRows = await Order.findAll({
    attributes: ['id'],
    where: {
      ...baseFilterWithStatus,
      ...(windowCond ? { [Op.and]: [windowCond] } : {}),
    },
    raw: true,
  });
  const orderIds = orderIdsRows.map((r) => r.id);

  // =======================
  // Barras: Top 3 productos por unidades (ventana AR + preset)
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
        // Si order_detail.created_at también existe y querés filtrar por su fecha AR:
        ...(windowCond ? { [Op.and]: [betweenExpr(literal(`CONVERT_TZ(order_detail.created_at, '${DB_TZ_OFFSET}', '${AR_TZ_OFFSET}')`), start, end)] } : {}),
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

  // Productos: vendidos (preset+ventana por orderIds) vs vencidos
  const soldUnitsRow = orderIds.length
    ? await OrderDetail.findOne({
        attributes: [[fn('COALESCE', fn('SUM', col('quantity')), 0), 'sold']],
        where: {
          order_id: { [Op.in]: orderIds },
        },
        raw: true,
      })
    : { sold: 0 };
  const soldUnits = Number(soldUnitsRow?.sold ?? 0);

  // Pedidos: realizados vs reclamados (CLAIMED+RETURNED)
  const completedOrders = Math.max(0, Number(totalOrders));

  // =======================
  // Histórico por mes (línea/área) - agrupado en AR
  // =======================
  const monthExpr = literal(
    `DATE_FORMAT(CONVERT_TZ(created_at, '${DB_TZ_OFFSET}', '${AR_TZ_OFFSET}'), '%Y-%m-01')`
  );

  const monthlyRows = await Order.findAll({
    attributes: [
      [monthExpr, 'month'],
      [fn('COUNT', col('id')), 'ordersCount'],
      [fn('COALESCE', fn('SUM', col('total_amount')), 0), 'totalAmount'],
    ],
    where: {
      ...baseFilterWithStatus,
      ...(windowCond ? { [Op.and]: [windowCond] } : {}),
    },
    group: [monthExpr],
    order: [monthExpr],
    raw: true,
  });

  const monthMap = {};
  monthlyRows.forEach((row) => {
    const key = monthKeyFromYYYYMM01(row.month); // yyyy-mm
    monthMap[key] = {
      month: key,
      ordersCount: Number(row.ordersCount ?? 0),
      totalAmount: Number(row.totalAmount ?? 0),
    };
  });

  // Construir serie continua (sin huecos)
  const endAR = nowInAR();
  const totalMonths = (mode === 'all') ? 12 : (monthsForSeries || 12);

  const salesByMonth = [];
  for (let i = totalMonths - 1; i >= 0; i--) {
    const d = new Date(endAR.getFullYear(), endAR.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${pad2(d.getMonth() + 1)}`;
    salesByMonth.push(monthMap[key] ?? { month: key, ordersCount: 0, totalAmount: 0 });
  }

  // =======================
  // Respuesta
  // =======================
  return {
    // KPIs (período seleccionado)
    totalRevenue,
    totalOrders,
    claimedOrders, 
    //lo dejamos por compat; pero tu agrupación principal está en claimedOrders
    returnedOrders,
    expiredProducts,

    // Gráficos
    topProductsBar,
    pieProducts: { soldUnits, expiredUnits: expiredProducts },
    // reclamados incluye devueltos siempre
    pieOrders: { completedOrders, claimedOrders },
    salesByMonth,

  };
};
