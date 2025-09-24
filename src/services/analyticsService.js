const Sequelize = require('sequelize');
const { Op, fn, col, literal, where, cast } = Sequelize;

const Order = require('../models/order');
const OrderDetail = require('../models/orderDetail');

if (!OrderDetail.associations.order) {
  const { sequelize } = require('../database');
  OrderDetail.belongsTo(Order, { foreignKey: 'order_id' });
}

function getDateWindow(period, tz) {
  const now = new Date();
  if (period === 'prev_month') {
    const firstOfCurrent = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
    const firstOfPrev = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1));
    const endPrev = new Date(firstOfCurrent.getTime() - 1); // último ms del mes anterior
    return { from: firstOfPrev, to: endPrev };
  }
  // default last30d
  const from = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  return { from, to: now };
}

async function safeNumber(promise, field, isInt = false) {
  const row = await promise;
  const raw = row?.[field] ?? 0;
  const n = Number(raw);
  return isInt ? Math.trunc(Number.isFinite(n) ? n : 0) : (Number.isFinite(n) ? n : 0);
}

exports.getOverview = async ({ commerceId, period = 'last30d', validStatuses = ['PAID','DELIVERED'], timezone = 'America/Argentina/Buenos_Aires' }) => {
  const baseFilter = {
    commerce_id: commerceId,
    status: { [Op.in]: validStatuses }
  };

  const { from, to } = getDateWindow(period, timezone);


  const ordersCountPromise = Order.count({ where: baseFilter });

 
  const productsSoldPromise = OrderDetail.findOne({
    attributes: [
      [fn('COALESCE', fn('SUM', col('quantity')), 0), 'qty']
    ],
    include: [{
      model: Order,
      attributes: [],
      where: baseFilter,
      required: true
    }],
    raw: true
  });


  const monthlyAggPromise = Order.findOne({
    attributes: [
      [fn('COALESCE', fn('SUM', col('total_amount')), 0), 'amount'],
      [fn('COUNT', col('id')), 'count']
    ],
    where: {
      ...baseFilter,
      created_at: { [Op.between]: [from, to] }
    },
    raw: true
  });

  const totalUsersPromise = Order.findOne({
    attributes: [[fn('COUNT', fn('DISTINCT', col('user_id'))), 'buyers']],
    where: baseFilter,
    raw: true
  });

  const [ordersCount, productsSoldRow, monthlyAggRow, totalUsersRow] = await Promise.all([
    ordersCountPromise,
    productsSoldPromise,
    monthlyAggPromise,
    totalUsersPromise
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
    totalUsers
  };
};
