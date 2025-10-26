// src/services/analyticsService.js
const { Op, fn, col, where, literal } = require('sequelize');
const {
  order: Order,
  order_detail: OrderDetail,
  publication: Publication,
  product: Product,
} = require('../../models');
const { getDateWindow } = require('../utils/getDateWindow');

exports.getOverview = async ({
  commerceId,
  period = 'last30d',
  validStatuses = ['PAID', 'DELIVERED', 'COMPLETED'],
  timezone = 'America/Argentina/Buenos_Aires',
}) => {
  // ---- Filtro base por status + comercio (sobre ORDER) ----
  let statusCondition;
  if (validStatuses !== 'ALL' && Array.isArray(validStatuses) && validStatuses.length > 0) {
    const statusesLower = validStatuses.map((s) => String(s).toLowerCase());
    statusCondition = where(fn('LOWER', col('status')), { [Op.in]: statusesLower });
  }

  const baseFilter = { commerce_id: commerceId };
  if (statusCondition) {
    baseFilter[Op.and] = baseFilter[Op.and]
      ? [baseFilter[Op.and], statusCondition]
      : [statusCondition];
  }

  const { from, to } = getDateWindow(period);

  // ---- 1) Obtener IDs de órdenes que cumplen el filtro (para usar en OrderDetail) ----
  const orderIdsRows = await Order.findAll({
    attributes: ['id'],
    where: baseFilter,
    raw: true,
  });
  const orderIds = orderIdsRows.map((r) => r.id);

  // ---- KPIs actuales ----
  const ordersCountPromise = Order.count({ where: baseFilter });

  // Sumatoria de cantidades vendidas (sobre order_detail) filtrando por order_id ∈ orderIds
  const productsSoldPromise =
    orderIds.length === 0
      ? Promise.resolve({ qty: 0 })
      : OrderDetail.findOne({
          attributes: [[fn('COALESCE', fn('SUM', col('quantity')), 0), 'qty']],
          where: { order_id: { [Op.in]: orderIds } },
          raw: true,
        });

  const monthlyWhere =
    from && to
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

  const totalUsersPromise = Order.findOne({
    attributes: [[fn('COUNT', fn('DISTINCT', col('user_id'))), 'buyers']],
    where: baseFilter,
    raw: true,
  });

  // ---- Ventas mensuales últimos 12 meses (MySQL compatible) ----
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth() - 11, 1);
  const monthExpr = fn('DATE_FORMAT', col('created_at'), '%Y-%m-01'); // yyyy-mm-01

  const monthlySalesPromise = Order.findAll({
    attributes: [
      [monthExpr, 'month'],
      [fn('COUNT', col('id')), 'ordersCount'],
      [fn('SUM', col('total_amount')), 'totalAmount'],
    ],
    where: {
      ...baseFilter,
      created_at: { [Op.between]: [startDate, now] },
    },
    group: [literal("DATE_FORMAT(created_at, '%Y-%m-01')")],
    order: [literal("DATE_FORMAT(created_at, '%Y-%m-01') ASC")],
    raw: true,
  });

  // ---- Top 3 productos últimos 12 meses ----
  // NOTA: como order_detail NO tiene asociación con order,
  // filtramos por order_id IN (IDs válidos) y por fecha en order_detail.created_at
  const topProductsPromise =
    orderIds.length === 0
      ? Promise.resolve([])
      : OrderDetail.findAll({
          attributes: [
            [col('Publication->Product.name'), 'productName'],
            [fn('SUM', col('quantity')), 'quantitySold'],
          ],
          where: {
            order_id: { [Op.in]: orderIds },
            created_at: { [Op.between]: [startDate, now] },
          },
          include: [
            {
              model: Publication,
              attributes: [],
              include: [{ model: Product, attributes: [] }],
              required: true,
            },
          ],
          group: [col('Publication->Product.name')],
          order: [[fn('SUM', col('quantity')), 'DESC']],
          limit: 3,
          raw: true,
        });

  // ---- Ejecutar en paralelo ----
  const [ordersCount, productsSoldRow, monthlyAggRow, totalUsersRow, monthlySales, topProductsRaw] =
    await Promise.all([
      ordersCountPromise,
      productsSoldPromise,
      monthlyAggPromise,
      totalUsersPromise,
      monthlySalesPromise,
      topProductsPromise,
    ]);

  // ---- Procesar resultados ----
  const productsSold = Number(productsSoldRow?.qty ?? 0);
  const monthlySalesAmount = Number(monthlyAggRow?.amount ?? 0);
  const monthlyOrdersCount = Number(monthlyAggRow?.count ?? 0);
  const totalUsers = Number(totalUsersRow?.buyers ?? 0);

  // Completar meses faltantes
  const monthMap = {};
  monthlySales.forEach((row) => {
    const month = new Date(row.month);
    const key = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, '0')}`;
    monthMap[key] = {
      month: key,
      ordersCount: Number(row.ordersCount),
      totalAmount: Number(row.totalAmount ?? 0),
    };
  });

  const salesByMonth = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    salesByMonth.push(monthMap[key] ?? { month: key, ordersCount: 0, totalAmount: 0 });
  }

  // Top 3 productos (con porcentajes)
  const totalQty = topProductsRaw.reduce((acc, p) => acc + Number(p.quantitySold ?? 0), 0) || 1;
  const topProducts = topProductsRaw.map((p) => ({
    productName: p.productName ?? 'Desconocido',
    quantitySold: Number(p.quantitySold ?? 0),
    percentage: Math.round((Number(p.quantitySold) / totalQty) * 100),
  }));

  // ---- Respuesta final ----
  return {
    ordersCount: Number(ordersCount),
    productsSold,
    monthlySalesAmount,
    monthlyOrdersCount,
    totalUsers,
    salesByMonth,
    topProducts,
  };
};
