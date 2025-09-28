const Sequelize = require('sequelize');
const { Op, fn, col, where } = Sequelize;

const Order = require('../models/order');
const OrderDetail = require('../models/orderDetail');

// Asegura la relación si no existe
if (!OrderDetail.associations.order) {
  OrderDetail.belongsTo(Order, { foreignKey: 'order_id' });
}

/**
 * Devuelve ventana temporal según 'period'
 * - last30d (default): últimos 30 días
 * - prev_month: mes calendario anterior (UTC seguro)
 * - all: sin filtro de fechas
 */
function getDateWindow(period) {
  const now = new Date();

  if (period === 'all') {
    // señal: no aplicar filtro de fechas
    return { from: null, to: null };
  }

  if (period === 'prev_month') {
    const firstOfCurrent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
    const firstOfPrev = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1));
    const endPrev = new Date(firstOfCurrent.getTime() - 1); // último ms del mes anterior
    return { from: firstOfPrev, to: endPrev };
  }

  // default: últimos 30 días
  const from = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  return { from, to: now };
}

/**
 * Obtiene métricas de overview para un commerce.
 * - validStatuses: array de estados válidos o 'ALL' para no filtrar
 * - period: 'last30d' | 'prev_month' | 'all'
 */
exports.getOverview = async ({
  commerceId,
  period = 'last30d',
  validStatuses = ['PAID', 'DELIVERED', 'PENDING'],
  timezone = 'America/Argentina/Buenos_Aires', // reservado para futuros ajustes TZ
}) => {
  // Construcción del filtro de status (case-insensitive).
  // Si validStatuses === 'ALL' o [], no se aplica filtro por status.
  let statusCondition = undefined;
  if (validStatuses !== 'ALL' && Array.isArray(validStatuses) && validStatuses.length > 0) {
    const statusesLower = validStatuses.map((s) => String(s).toLowerCase());
    statusCondition = where(fn('LOWER', col('status')), { [Op.in]: statusesLower });
  }

  // Filtro base por comercio
  const baseFilter = { commerce_id: commerceId };
  if (statusCondition) {
    baseFilter[Op.and] = baseFilter[Op.and] ? [baseFilter[Op.and], statusCondition] : [statusCondition];
  }

  const { from, to } = getDateWindow(period);

  // 1) Pedidos totales (histórico, con filtro de status si aplica)
  const ordersCountPromise = Order.count({ where: baseFilter });

  // 2) Productos vendidos (histórico): suma de quantity en OrderDetail con join a Order
  const productsSoldPromise = OrderDetail.findOne({
    attributes: [[fn('COALESCE', fn('SUM', col('quantity')), 0), 'qty']],
    include: [
      {
        model: Order,
        attributes: [],
        where: baseFilter, // respeta comercio + status
        required: true,
      },
    ],
    raw: true,
  });

  // 3) Ventas del período (monto y cantidad de pedidos)
  const monthlyWhere = from && to
    ? { ...baseFilter, created_at: { [Op.between]: [from, to] } }
    : { ...baseFilter };

  const monthlyAggPromise = Order.findOne({
    attributes: [
      [fn('COALESCE', fn('SUM', col('total_amount')), 0), 'amount'],
      [fn('COUNT', col('id')), 'count'],
    ],
    where: monthlyWhere,
    raw: true,
  });

  // 4) Cantidad de usuarios (distintos compradores históricos del comercio)
  const totalUsersPromise = Order.findOne({
    attributes: [[fn('COUNT', fn('DISTINCT', col('user_id'))), 'buyers']],
    where: baseFilter,
    raw: true,
  });

  const [ordersCount, productsSoldRow, monthlyAggRow, totalUsersRow] = await Promise.all([
    ordersCountPromise,
    productsSoldPromise,
    monthlyAggPromise,
    totalUsersPromise,
  ]);

  const productsSold = Number(productsSoldRow?.qty ?? 0);
  const monthlySalesAmount = Number(monthlyAggRow?.amount ?? 0);
  const monthlyOrdersCount = Number(monthlyAggRow?.count ?? 0);
  const totalUsers = Number(totalUsersRow?.buyers ?? 0);

  return {
    ordersCount: Number(ordersCount),
    productsSold,
    monthlySalesAmount,
    monthlyOrdersCount,
    totalUsers,
  };
};
