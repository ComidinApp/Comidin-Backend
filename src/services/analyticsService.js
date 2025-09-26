const Sequelize = require('sequelize');
const { Op, fn, col, where } = Sequelize;

const Order = require('../models/order');
const OrderDetail = require('../models/orderDetail');

// Asegura la relación si no existe
if (!OrderDetail.associations.order) {
  OrderDetail.belongsTo(Order, { foreignKey: 'order_id' });
}

function getDateWindow(period) {
  const now = new Date();
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

exports.getOverview = async ({
  commerceId,
  period = 'last30d',
  validStatuses = ['PAID', 'DELIVERED', 'pending'], // incluye 'pending' por defecto
  timezone = 'America/Argentina/Buenos_Aires', // reservado para futuros ajustes TZ
}) => {
  // Construcción del filtro de status (case-insensitive).
  // Si validStatuses === 'ALL' o [], no se aplica filtro por status.
  let statusCondition = undefined;
  if (
    validStatuses !== 'ALL' &&
    Array.isArray(validStatuses) &&
    validStatuses.length > 0
  ) {
    const statusesLower = validStatuses.map((s) => String(s).toLowerCase());
    statusCondition = where(fn('LOWER', col('status')), { [Op.in]: statusesLower });
  }

  const baseFilter = { commerce_id: commerceId };
  if (statusCondition) {
    baseFilter[Op.and] = baseFilter[Op.and] ? [baseFilter[Op.and], statusCondition] : [statusCondition];
  }

  const { from, to } = getDateWindow(period);

  // 1) Pedidos totales (histórico)
  const ordersCountPromise = Order.count({ where: baseFilter });

  // 2) Productos vendidos (histórico) sumando quantity de OrderDetail
  const productsSoldPromise = OrderDetail.findOne({
    attributes: [[fn('COALESCE', fn('SUM', col('quantity')), 0), 'qty']],
    include: [
      {
        model: Order,
        attributes: [],
        where: baseFilter,
        required: true,
      },
    ],
    raw: true,
  });

  // 3) Ventas del período (monto y cantidad de pedidos)
  const monthlyAggPromise = Order.findOne({
    attributes: [
      [fn('COALESCE', fn('SUM', col('total_amount')), 0), 'amount'],
      [fn('COUNT', col('id')), 'count'],
    ],
    where: {
      ...baseFilter,
      created_at: { [Op.between]: [from, to] },
    },
    raw: true,
  });

  // 4) Cantidad de usuarios (distintos compradores históricos)
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
