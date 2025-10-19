exports.getOverview = async ({
  commerceId,
  period = 'last30d',
  validStatuses = ['PAID', 'DELIVERED', 'COMPLETED'],
  timezone = 'America/Argentina/Buenos_Aires',
}) => {
  // ---- Filtro base por status + comercio ----
  let statusCondition;
  if (validStatuses !== 'ALL' && Array.isArray(validStatuses) && validStatuses.length > 0) {
    const statusesLower = validStatuses.map((s) => String(s).toLowerCase());
    statusCondition = where(fn('LOWER', col('status')), { [Op.in]: statusesLower });
  }

  const baseFilter = { commerce_id: commerceId };
  if (statusCondition) {
    baseFilter[Op.and] = baseFilter[Op.and] ? [baseFilter[Op.and], statusCondition] : [statusCondition];
  }

  const { from, to } = getDateWindow(period);

  // ---- KPIs actuales (sin cambios) ----
  const ordersCountPromise = Order.count({ where: baseFilter });

  const productsSoldPromise = OrderDetail.findOne({
    attributes: [[fn('COALESCE', fn('SUM', col('quantity')), 0), 'qty']],
    include: [{ model: Order, attributes: [], where: baseFilter, required: true }],
    raw: true,
  });

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

  const totalUsersPromise = Order.findOne({
    attributes: [[fn('COUNT', fn('DISTINCT', col('user_id'))), 'buyers']],
    where: baseFilter,
    raw: true,
  });

  // ---- NUEVO: ventas mensuales de los últimos 12 meses ----
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth() - 11, 1); // hace 12 meses exactos

  const monthlySalesPromise = Order.findAll({
    attributes: [
      [fn('DATE_TRUNC', 'month', col('created_at')), 'month'],
      [fn('COUNT', col('id')), 'ordersCount'],
      [fn('SUM', col('total_amount')), 'totalAmount'],
    ],
    where: {
      ...baseFilter,
      created_at: { [Op.between]: [startDate, now] },
    },
    group: [fn('DATE_TRUNC', 'month', col('created_at'))],
    order: [[fn('DATE_TRUNC', 'month', col('created_at')), 'ASC']],
    raw: true,
  });

  // ---- NUEVO: top 3 productos últimos 12 meses ----
  const topProductsPromise = OrderDetail.findAll({
    attributes: [
      [col('Publication->Product.name'), 'productName'],
      [fn('SUM', col('quantity')), 'quantitySold'],
    ],
    include: [
      {
        model: Order,
        attributes: [],
        where: {
          ...baseFilter,
          created_at: { [Op.between]: [startDate, now] },
        },
        required: true,
      },
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

  // ---- Esperar todo en paralelo ----
  const [ordersCount, productsSoldRow, monthlyAggRow, totalUsersRow, monthlySales, topProductsRaw] =
    await Promise.all([
      ordersCountPromise,
      productsSoldPromise,
      monthlyAggPromise,
      totalUsersPromise,
      monthlySalesPromise,
      topProductsPromise,
    ]);

  // ---- Calcular y formatear resultados ----
  const productsSold = Number(productsSoldRow?.qty ?? 0);
  const monthlySalesAmount = Number(monthlyAggRow?.amount ?? 0);
  const monthlyOrdersCount = Number(monthlyAggRow?.count ?? 0);
  const totalUsers = Number(totalUsersRow?.buyers ?? 0);

  // Completar meses faltantes con 0
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

  // Calcular top 3 productos
  const totalQty = topProductsRaw.reduce((acc, p) => acc + Number(p.quantitySold ?? 0), 0) || 1;
  const topProducts = topProductsRaw.map((p) => ({
    productName: p.productName ?? 'Desconocido',
    quantitySold: Number(p.quantitySold ?? 0),
    percentage: Math.round((Number(p.quantitySold) / totalQty) * 100),
  }));

  // ---- Devolver todo ----
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
