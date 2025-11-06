// src/services/reportService.js
const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');
const { Op, fn, col, where } = require('sequelize');

let Models;
try { Models = require('../models'); } catch { Models = require('../../models'); }
const { order: Order } = Models;

// ======= helpers de período (mismos que en analyticsService) =======
function resolveMonths(period) {
  const p = String(period || '').toLowerCase();
  if (p === 'all') return { mode: 'all', months: 0 };
  if (p === 'last30d' || p === 'last1m') return { mode: 'months', months: 1 };
  if (p === 'last3m') return { mode: 'months', months: 3 };
  if (p === 'last6m') return { mode: 'months', months: 6 };
  if (p === 'last12m' || p === 'prev_month') return { mode: 'months', months: 12 };
  return { mode: 'months', months: 3 };
}
function computeWindow(period) {
  const { mode, months } = resolveMonths(period);
  if (mode === 'all') return { startDate: null, endDate: new Date() };
  const endDate = new Date();
  const startDate = new Date(endDate.getFullYear(), endDate.getMonth() - (months - 1), 1);
  return { startDate, endDate };
}
function between(field, startDate, endDate) {
  if (!startDate) return {};
  return { [field]: { [Op.between]: [startDate, endDate] } };
}
const ciStatusIn = (values) =>
  where(fn('LOWER', col('status')), { [Op.in]: values.map((v) => String(v).toLowerCase()) });

// ======= R6: datos de órdenes para Excel =======
exports.getOrdersForExport = async ({ commerceId, period, validStatuses = 'ALL' }) => {
  const { startDate, endDate } = computeWindow(period);

  let statusCondition;
  if (validStatuses !== 'ALL' && Array.isArray(validStatuses) && validStatuses.length) {
    statusCondition = ciStatusIn(validStatuses);
  }

  const whereOrder = {
    commerce_id: commerceId,
    ...between('created_at', startDate, endDate),
  };
  if (statusCondition) whereOrder[Op.and] = [statusCondition];

  const orders = await Order.findAll({
    attributes: [
      'id',
      'created_at',
      'status',
      'total_amount',
      'payment_method',
      'customer_name',
      'customer_email',
    ],
    where: whereOrder,
    order: [['created_at', 'ASC']],
    raw: true,
  });

  return orders.map((o) => ({
    orderId: o.id,
    date: o.created_at,
    status: o.status,
    total: Number(o.total_amount ?? 0),
    paymentMethod: o.payment_method ?? '',
    customerName: o.customer_name ?? '',
    customerEmail: o.customer_email ?? '',
  }));
};

// ======= R6: construir Excel =======
exports.buildOrdersXLSX = async (rows, meta = {}) => {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet('Órdenes');

  ws.columns = [
    { header: 'N° Orden', key: 'orderId', width: 14 },
    { header: 'Fecha', key: 'date', width: 20 },
    { header: 'Estado', key: 'status', width: 16 },
    { header: 'Total', key: 'total', width: 14 },
    { header: 'Medio de pago', key: 'paymentMethod', width: 18 },
    { header: 'Cliente', key: 'customerName', width: 24 },
    { header: 'Email', key: 'customerEmail', width: 28 },
  ];

  rows.forEach((r) => {
    ws.addRow({
      ...r,
      date: r.date ? new Date(r.date) : null,
    });
  });

  // Formato: fecha y moneda ARS
  const dateCol = ws.getColumn('date');
  dateCol.numFmt = 'dd/mm/yyyy hh:mm';

  const totalCol = ws.getColumn('total');
  totalCol.numFmt = '"$" #,##0.00';

  // Header en negrita
  ws.getRow(1).font = { bold: true };

  // Meta hoja
  const metaSheet = wb.addWorksheet('Meta');
  metaSheet.addRow(['Período', String(meta.period || '')]);
  metaSheet.addRow(['Filtro estado', String(meta.status || '')]);
  metaSheet.getRow(1).font = { bold: true };
  metaSheet.getRow(2).font = { bold: true };

  return wb.xlsx.writeBuffer();
};

// ======= R1: PDF Ejecutivo =======
exports.streamExecutivePDF = (res, { period, statusPreset, overview, context }) => {
  const doc = new PDFDocument({ margin: 40 });
  doc.pipe(res);

  const title = 'Informe de Ventas';
  const sub = `Comercio: ${context.commerceId}  |  Período: ${period}  |  Estado: ${statusPreset}`;
  const nowStr = new Date().toLocaleString('es-AR');

  // Portada / encabezado
  doc.fontSize(18).text(title, { align: 'left' });
  doc.moveDown(0.2);
  doc.fontSize(10).fillColor('#666').text(sub);
  doc.fontSize(9).text(`Generado: ${nowStr}`);
  doc.moveDown();

  // KPIs
  doc.moveDown(0.5);
  doc.fillColor('#000').fontSize(12).text('Resumen (KPI)', { underline: true });
  doc.moveDown(0.4);

  const currency = (v) => `$ ${Number(v || 0).toLocaleString('es-AR', { minimumFractionDigits: 2 })}`;
  const integer = (v) => Number(v || 0).toLocaleString('es-AR');

  const kpis = [
    ['Ventas totales', currency(overview.totalRevenue)],
    ['Pedidos realizados', integer(overview.totalOrders)],
    ['Pedidos devueltos', integer(overview.returnedOrders)],
    ['Productos vencidos', integer(overview.expiredProducts)],
  ];

  kpis.forEach(([k, v]) => {
    doc.fontSize(11).text(`${k}: `, { continued: true, width: 220 }).font('Helvetica-Bold').text(v);
    doc.font('Helvetica');
  });

  doc.moveDown();

  // Ventas y pedidos por mes (tabla simple)
  doc.fontSize(12).text('Ventas y pedidos por mes', { underline: true });
  doc.moveDown(0.4);
  doc.fontSize(10).text('Mes            Pedidos         Ventas ($)');
  doc.moveTo(doc.x, doc.y).lineTo(540, doc.y).strokeColor('#999').stroke();
  doc.moveDown(0.3);

  (overview.salesByMonth || []).forEach((m) => {
    const [yy, mm] = m.month.split('-');
    const label = new Date(Number(yy), Number(mm) - 1, 1).toLocaleDateString('es-AR', { month: 'short', year: '2-digit' });
    const line = [
      label.padEnd(12, ' '),
      String(m.ordersCount).padStart(6, ' '),
      currency(m.totalAmount).padStart(18, ' '),
    ].join('   ');
    doc.fontSize(10).text(line);
  });

  doc.moveDown();

  // Top 3 productos
  doc.fontSize(12).text('Top 3 productos por unidades', { underline: true });
  doc.moveDown(0.4);
  if ((overview.topProductsBar || []).length) {
    doc.fontSize(10).text('Producto                                  Unidades');
    doc.moveTo(doc.x, doc.y).lineTo(540, doc.y).strokeColor('#999').stroke();
    doc.moveDown(0.3);
    overview.topProductsBar.forEach((p) => {
      const name = (p.productName || 'Desconocido').slice(0, 36);
      const units = integer(p.units).padStart(6, ' ');
      doc.text(`${name.padEnd(40, ' ')}   ${units}`);
    });
  } else {
    doc.fontSize(10).fillColor('#666').text('Sin datos en el período seleccionado.');
    doc.fillColor('#000');
  }

  doc.moveDown();

  // Tortas (resumen texto)
  doc.fontSize(12).text('Resumen de productos y pedidos', { underline: true });
  doc.moveDown(0.4);
  const sold = overview?.pieProducts?.soldUnits || 0;
  const expi = overview?.pieProducts?.expiredUnits || 0;
  const compl = overview?.pieOrders?.completedOrders || 0;
  const claim = overview?.pieOrders?.claimedOrders || 0;

  doc.fontSize(10).text(`Productos — Vendidos: ${integer(sold)} | Vencidos: ${integer(expi)}`);
  doc.fontSize(10).text(`Pedidos   — Realizados: ${integer(compl)} | Reclamados: ${integer(claim)}`);

  // Cierre
  doc.moveDown(1.2);
  doc.fontSize(9).fillColor('#666').text('Este informe resume la actividad del período seleccionado.');  
  doc.end();
};
