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

exports.getOverview = async ({
  commerceId,
  period = 'last30d',
  validStatuses = ['PAID', 'DELIVERED', 'COMPLETED'],
  timezone = 'America/Argentina/Buenos_Aires',
}) => {
  // Filtro base por comercio, con opción de status cuando toque
  let statusCondition;
  if (validStatuses !== 'ALL' && Array.isArray(validStatuses) && validStatuses.length > 0) {
    const statusesLower = validStatuses.map((s) => String(s).toLowerCase());
    statusCondition = where(fn('LOWER', col('status')), { [Op.in]: statusesLower });
  }
  const baseFilter = { commerce_id: commerceId };
  if (statusCondition) {
    baseFilter[Op.and] = baseFilter[Op.and] ? [baseFilter[Op.and], statusCondition] : [statusCondition];
  }

  // ===== KPIs (históricos) =====

  // Ingresos históricos (no hay costo → no calculamos ganancia)
  const totalRevenueRow = await Order.findOne({
    attributes: [[fn('COALESCE', fn('SUM', col('total_amount')), 0), 'revenue']],
    where: { commerce_id: commerceId },
    raw: true,
  });
  const totalRevenue = Number(totalRevenueRow?.revenue ?? 0);

  // Pedidos realizados históricos
  const totalOrders = await Order.count({
    where: {
      commerce_id: commerceId,
      status: { [Op.in]: DONE_STATUSES },
    },
  });

  // Pedidos devueltos históricos
  const returnedOrders = await Order.count({
    where: {
      commerce_id: commerceId,
      status: { [Op.in]: RETURN_STATUSES },
    },
  });

  // Productos vencidos históricos (por fecha): sum(available_stock) de publicaciones vencidas
  const expiredRows = await Publication.findAll({
    attributes: [[fn('COALESCE', fn('SUM', col('available_stock')), 0), 'expiredStock']],
    where: {
      commerce_id: commerceId,
      expiration_date: { [Op.lt]: new Date() }, // vencidas por fecha
    },
    raw: true,
  });
  const expiredProducts = Number(expiredRows?.[0]?.expiredStock ?? 0);

  // ===== Gráfico de barras: Top 3 productos por unidades (últimos 12 meses) =====
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth() - 11, 1);

  // Buscar IDs de órdenes del comercio (para filtrar order_detail)
  const orderIdsRows = await Order.findAll({
    attributes: ['id'],
    where: { commerce_id: commerceId },
    raw: true,
  });
  const orderIds = orderIdsRows.map((r) => r.id);

  let topProductsBar = [];
  if (orderIds.length) {
    const top3Raw = await OrderDetail.findAll({
      attributes: [
        [col('publication->product.name'), 'productName'],
        [fn('SUM', col('quantity')), 'units'],
      ],
      where: {
        order_id: { [Op.in]: orderIds },
        created_at: { [Op.between]: [startDate, now] },
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

  // Productos: vendidos vs vencidos
  const soldUnitsRow = orderIds.length
    ? await OrderDetail.findOne({
        attributes: [[fn('COALESCE', fn('SUM', col('quantity')), 0), 'sold']],
        where: { order_id: { [Op.in]: orderIds } },
        raw: true,
      })
    : { sold: 0 };

  const soldUnits = Number(soldUnitsRow?.sold ?? 0);

  // Pedidos: realizados vs reclamados
  const claimedOrders = await Order.count({
    where: { commerce_id: commerceId, status: { [Op.in]: CLAIM_STATUSES } },
  });

  const completedOrders = Math.max(0, Number(totalOrders)); // ya son "realizados"

  // ===== Respuesta =====
  return {
    totalRevenue,             // Ingresos (histórico)
    totalOrders,              // Pedidos realizados (histórico)
    returnedOrders,           // Pedidos devueltos (histórico)
    expiredProducts,          // Productos vencidos (histórico) = stock vencido
    topProductsBar,           // Barras (Top 3 por unidades)
    pieProducts: {            // Torta productos
      soldUnits,
      expiredUnits: expiredProducts,
    },
    pieOrders: {              // Torta pedidos
      completedOrders,
      claimedOrders,
    },
  };
};
