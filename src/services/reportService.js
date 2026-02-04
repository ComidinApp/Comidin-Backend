// src/services/reportService.js
const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');
const { Op, fn, col, where, literal } = require('sequelize');
const fs = require('fs');
const path = require('path');

let Models;
try { Models = require('../models'); } catch { Models = require('../../models'); }
const { order: Order, publication: Publication, commerce: Commerce } = Models || {};

/* ==========================
   Helpers de FECHA (SIN TZ)
   ========================== */
function pad2(n) { return String(n).padStart(2, '0'); }
function toMysqlDateTime(d) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())} ${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;
}

function resolvePeriod(period) {
  const p = String(period || '').toLowerCase();

  // ✅ Cambio: "all" = últimos 12 meses (coherente con analytics)
  if (p === 'all') return { mode: 'months', months: 12 };

  if (p === 'this_month' || p === 'last1m') return { mode: 'this_month' };
  if (p === 'last30d') return { mode: 'days', days: 30 };
  if (p === 'last3m') return { mode: 'months', months: 3 };
  if (p === 'last6m') return { mode: 'months', months: 6 };
  if (p === 'last12m') return { mode: 'months', months: 12 };
  if (p === 'prev_month') return { mode: 'prev_month' };

  return { mode: 'months', months: 3 };
}

function computeWindowMysql(period) {
  const cfg = resolvePeriod(period);
  const now = new Date();

  if (cfg.mode === 'this_month') {
    const start = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);
    return { start: toMysqlDateTime(start), end: toMysqlDateTime(now) };
  }

  if (cfg.mode === 'prev_month') {
    const start = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0);
    const end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
    return { start: toMysqlDateTime(start), end: toMysqlDateTime(end) };
  }

  if (cfg.mode === 'days') {
    const start = new Date(now);
    start.setDate(start.getDate() - (cfg.days - 1));
    start.setHours(0, 0, 0, 0);
    return { start: toMysqlDateTime(start), end: toMysqlDateTime(now) };
  }

  // months (incluye mes actual desde el día 1)
  const start = new Date(now.getFullYear(), now.getMonth() - (cfg.months - 1), 1, 0, 0, 0);
  return { start: toMysqlDateTime(start), end: toMysqlDateTime(now) };
}

function between(field, start, end) {
  if (!start) return {};
  return { [field]: { [Op.between]: [start, end] } };
}

const ciStatusIn = (values) =>
  where(fn('LOWER', col('status')), { [Op.in]: values.map((v) => String(v).toLowerCase()) });

/* ==========================
   Estados
   ========================== */
// Nota: en reportes generalmente se exportan "según preset" (validStatuses),
// pero también se usan estos en PDFs en algunos lugares.
const DONE_STATUSES = ['DELIVERED', 'COMPLETED'];
const CLAIM_GROUP_STATUSES = ['CLAIMED', 'RETURNED']; // ✅ agrupación única "reclamado"

/* ==========================
   Traducciones
   ========================== */
function periodLabel(period) {
  const p = String(period || '').toLowerCase();
  if (p === 'all') return 'Últimos 12 meses';
  if (p === 'this_month') return 'Este mes';
  if (p === 'last30d' || p === 'last1m') return 'Últimos 30 días';
  if (p === 'last3m') return 'Últimos 3 meses';
  if (p === 'last6m') return 'Últimos 6 meses';
  if (p === 'last12m') return 'Últimos 12 meses';
  if (p === 'prev_month') return 'Mes anterior';
  return p;
}
function statusLabel(preset) {
  const s = String(preset || '').toLowerCase();
  if (s === 'valid') return 'Solo completados';
  if (s === 'open') return 'Incluye pendientes';
  if (s === 'all') return 'Todos';
  return s;
}

function translateOrderStatus(status) {
  const s = String(status || '').toUpperCase();
  switch (s) {
    case 'PENDING': return 'Pendiente';
    case 'DELIVERED': return 'Entregado';
    case 'COMPLETED': return 'Completado';
    case 'CLAIMED': return 'Reclamado';
    case 'RETURNED': return 'Devuelto';
    case 'CANCELLED': return 'Cancelado';
    default: return status || '';
  }
}

/* ==========================
   Excel robusto
   ========================== */
function pickOrderAttributes() {
  const attrs = Order?.rawAttributes ? Object.keys(Order.rawAttributes) : [];

  const map = {
    id: 'id',
    created_at: attrs.includes('created_at') ? 'created_at' : (attrs.includes('createdAt') ? 'createdAt' : null),
    status: attrs.includes('status') ? 'status' : null,
    total_amount: attrs.includes('total_amount') ? 'total_amount' : (attrs.includes('totalAmount') ? 'totalAmount' : null),

    // opcionales
    payment_method: attrs.includes('payment_method') ? 'payment_method' : (attrs.includes('paymentMethod') ? 'paymentMethod' : null),
    customer_name: attrs.includes('customer_name') ? 'customer_name' : (attrs.includes('customerName') ? 'customerName' : null),
    customer_email: attrs.includes('customer_email') ? 'customer_email' : (attrs.includes('customerEmail') ? 'customerEmail' : null),
  };

  const attributes = ['id'];
  if (map.created_at) attributes.push(map.created_at);
  if (map.status) attributes.push(map.status);
  if (map.total_amount) attributes.push(map.total_amount);
  if (map.payment_method) attributes.push(map.payment_method);
  if (map.customer_name) attributes.push(map.customer_name);
  if (map.customer_email) attributes.push(map.customer_email);

  return { map, attributes };
}

exports.getOrdersForExport = async ({ commerceId, period, validStatuses = 'ALL' }) => {
  const { start, end } = computeWindowMysql(period);

  let statusCondition;
  if (validStatuses !== 'ALL' && Array.isArray(validStatuses) && validStatuses.length) {
    statusCondition = ciStatusIn(validStatuses);
  }

  const whereOrder = {
    commerce_id: commerceId,
    ...between('created_at', start, end),
  };
  if (statusCondition) whereOrder[Op.and] = [statusCondition];

  const { map, attributes } = pickOrderAttributes();

  const orders = await Order.findAll({
    attributes,
    where: whereOrder,
    order: [map.created_at ? [map.created_at, 'ASC'] : ['id', 'ASC']],
    raw: true,
  });

  // ✅ IMPORTANTÍSIMO: devolvemos fecha como string tal cual viene (sin new Date())
  return orders.map((o) => ({
    orderId: o.id,
    date: map.created_at ? (o[map.created_at] ?? null) : null, // string "YYYY-MM-DD HH:mm:ss"
    status: translateOrderStatus(map.status ? (o[map.status] ?? '') : ''),
    total: map.total_amount ? Number(o[map.total_amount] ?? 0) : 0,
    paymentMethod: map.payment_method ? (o[map.payment_method] ?? '') : '',
    customerName: map.customer_name ? (o[map.customer_name] ?? '') : '',
    customerEmail: map.customer_email ? (o[map.customer_email] ?? '') : '',
  }));
};

exports.buildOrdersXLSX = async (rows, meta = {}) => {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet('Órdenes');

  const hasPayment = rows.some((r) => r.paymentMethod);
  const hasCustName = rows.some((r) => r.customerName);
  const hasCustMail = rows.some((r) => r.customerEmail);

  const columns = [
    { header: 'N° Orden', key: 'orderId', width: 14 },
    { header: 'Fecha', key: 'date', width: 20 },
    { header: 'Estado', key: 'status', width: 16 },
    { header: 'Total', key: 'total', width: 14 },
  ];
  if (hasPayment) columns.push({ header: 'Medio de pago', key: 'paymentMethod', width: 18 });
  if (hasCustName) columns.push({ header: 'Cliente', key: 'customerName', width: 24 });
  if (hasCustMail) columns.push({ header: 'Email', key: 'customerEmail', width: 28 });

  ws.columns = columns;

  rows.forEach((r) => {
    // ✅ Fecha como TEXTO para evitar corrimientos por timezone/parsing
    ws.addRow({
      ...r,
      date: r.date ? String(r.date) : '',
    });
  });

  ws.getRow(1).font = { bold: true };

  // formato de dinero
  const totalCol = ws.getColumn('total');
  if (totalCol) totalCol.numFmt = '"$" #,##0.00';

  // Hoja meta
  const metaSheet = wb.addWorksheet('Meta');
  metaSheet.addRow(['Período', String(meta.period || '')]);
  metaSheet.addRow(['Filtro estado', String(meta.status || '')]);
  metaSheet.getRow(1).font = { bold: true };
  metaSheet.getRow(2).font = { bold: true };

  return wb.xlsx.writeBuffer();
};

/* ==========================
   PDF estilizado
   ========================== */
const THEME = {
  primary: '#00B8D9',
  accent: '#FF8C00',
  text: '#222222',
  muted: '#6B7280',
  border: '#E5E7EB',
  card: '#F7FAFC',
};

function resolveFirstExisting(candidates = []) {
  for (const pth of candidates) {
    if (!pth) continue;
    try {
      if (fs.existsSync(pth)) return pth;
    } catch {}
  }
  return null;
}

const LOGO_PATH = resolveFirstExisting([
  '/comidin/assets/logo.png',
  '/app/assets/logo.png',
  path.resolve(__dirname, '../../assets/logo.png'),
  path.resolve(__dirname, '../assets/logo.png'),
  path.resolve(process.cwd(), 'assets/logo.png'),
]);

function headerCentered(doc, title, subtitle, options = {}) {
  const { logoPath } = options;
  const { width } = doc.page;
  const left = doc.page.margins.left;
  const usable = width - left - doc.page.margins.right;

  doc.save().rect(0, 0, width, 8).fill(THEME.primary).restore();

  const LOGO_W = 120;
  const LOGO_H_PAD = 6;
  let y = 18;

  if (logoPath) {
    try {
      const x = left + (usable - LOGO_W) / 2;
      doc.image(logoPath, x, y, { width: LOGO_W });
      y += 30 + LOGO_H_PAD;
    } catch {
      y += 8;
    }
  }

  doc.fontSize(20).fillColor(THEME.text).text(title, left, y + 6, { width: usable, align: 'center' });
  doc.fontSize(10).fillColor(THEME.muted).text(subtitle, left, y + 30, { width: usable, align: 'center' });

  const sepY = y + 52;
  doc.moveTo(left, sepY).lineTo(left + usable, sepY).lineWidth(1).strokeColor(THEME.border).stroke();
  return sepY + 12;
}

function footerNumbering(doc) {
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    const { width, height, margins } = doc.page;
    const text = `Página ${i + 1} de ${range.count}`;
    doc.fontSize(9).fillColor(THEME.muted).text(text, margins.left, height - margins.bottom + 8, {
      width: width - margins.left - margins.right,
      align: 'right',
    });
  }
}

function kpiCard(doc, x, y, w, h, label, valueStr, color = THEME.primary) {
  doc.save().roundedRect(x, y, w, h, 12).fill(THEME.card).restore();
  doc.save().roundedRect(x, y, 6, h, 12).fill(color).restore();
  doc.fillColor(THEME.muted).fontSize(10).text(label, x + 14, y + 12, { width: w - 20 });
  doc.fillColor(THEME.text).fontSize(18).text(valueStr, x + 14, y + 32, { width: w - 20 });
}

function table(doc, { x, y, w }, headers, rows, opts = {}) {
  const rowH = opts.rowHeight || 22;
  const zebra = opts.zebra !== false;
  const colWidths = opts.colWidths || headers.map(() => Math.floor(w / headers.length));

  doc.save().rect(x, y, w, rowH).fill(THEME.primary).restore();

  let cx = x;
  headers.forEach((h, i) => {
    doc.fillColor('#fff').fontSize(10).text(h, cx + 8, y + 6, { width: colWidths[i], ellipsis: true });
    cx += colWidths[i];
  });

  let yy = y + rowH;
  rows.forEach((r, idx) => {
    if (zebra && idx % 2 === 1) doc.save().rect(x, yy, w, rowH).fill('#FAFAFA').restore();

    let cx2 = x;
    r.forEach((cell, i) => {
      doc.fillColor(THEME.text).fontSize(10).text(String(cell ?? ''), cx2 + 8, yy + 6, {
        width: colWidths[i],
        ellipsis: true,
      });
      cx2 += colWidths[i];
    });
    yy += rowH;
  });

  doc.save().lineWidth(1).strokeColor(THEME.border).rect(x, y, w, rowH + rows.length * rowH).stroke().restore();
  return yy;
}

function miniBar(doc, x, y, w, h, value, max, color) {
  const ratio = max > 0 ? Math.min(value / max, 1) : 0;
  const barW = Math.max(2, Math.round(w * ratio));
  doc.save().roundedRect(x, y, w, h, 4).fill('#F1F5F9').restore();
  doc.save().roundedRect(x, y, barW, h, 4).fill(color || THEME.accent).restore();
}

async function getCommerceNameSafe(commerceId) {
  try {
    if (!Commerce?.findByPk) return null;
    const row = await Commerce.findByPk(commerceId, { attributes: ['name'], raw: true });
    return row?.name || null;
  } catch {
    return null;
  }
}

/* ====== Informe PDF ====== */
exports.streamExecutivePDF = async (res, { period, statusPreset, overview, context }) => {
  const doc = new PDFDocument({ margin: 40, size: 'A4', bufferPages: true });
  doc.pipe(res);

  const now = new Date();
  const nowStr =
    `${pad2(now.getDate())}/${pad2(now.getMonth() + 1)}/${now.getFullYear()} ${pad2(now.getHours())}:${pad2(now.getMinutes())}`;

  let commerceText = `Comercio: ${context.commerceId}`;
  const fetchedName = await getCommerceNameSafe(context.commerceId);
  if (fetchedName) commerceText = `Comercio: ${fetchedName}`;

  const title = 'Informe de Ventas';
  const subtitle = [
    commerceText,
    `Período: ${periodLabel(period)}`,
    `Estado: ${statusLabel(statusPreset)}`,
    `Generado: ${nowStr}`,
  ].join('  •  ');

  let y = headerCentered(doc, title, subtitle, { logoPath: LOGO_PATH });

  const pageW = doc.page.width - doc.page.margins.left - doc.page.margins.right;
  const left = doc.page.margins.left;

  const currency = (v) => `$ ${Number(v || 0).toLocaleString('es-AR', { minimumFractionDigits: 2 })}`;
  const integer = (v) => Number(v || 0).toLocaleString('es-AR');

  // ===== KPI Cards =====
  const kpiW = Math.floor((pageW - 24) / 2);
  const kpiH = 64;

  kpiCard(doc, left, y, kpiW, kpiH, 'Ventas totales', currency(overview.totalRevenue), THEME.primary);
  kpiCard(doc, left + kpiW + 24, y, kpiW, kpiH, 'Pedidos realizados', integer(overview.totalOrders), THEME.accent);

  y += kpiH + 14;

  // ✅ Reclamados
  kpiCard(
    doc,
    left,
    y,
    kpiW,
    kpiH,
    'Pedidos reclamados',
    integer(overview.claimedOrders ?? overview?.pieOrders?.claimedOrders ?? 0),
    '#EF4444'
  );

  // ✅ Productos vencidos: AHORA mostramos cantidad de productos (expiredCount)
  // fallback a overview.expiredProducts si llega viejo
  const expiredCount =
    Number(overview?.expiredCount ?? 0) ||
    Number(overview?.expiredProductsCount ?? 0) ||
    0;

  kpiCard(
    doc,
    left + kpiW + 24,
    y,
    kpiW,
    kpiH,
    'Productos vencidos',
    integer(expiredCount),
    '#F59E0B'
  );

  y += kpiH + 26;

  // Ventas y pedidos por mes
  doc.fontSize(13).fillColor(THEME.text).text('Ventas y pedidos por mes', left, y);
  y += 10;

  const monthRows = (overview.salesByMonth || []).map((m) => {
    const [yy, mm] = m.month.split('-');
    const label = new Date(Number(yy), Number(mm) - 1, 1).toLocaleDateString('es-AR', {
      month: 'short',
      year: '2-digit',
    });
    return [label, integer(m.ordersCount), currency(m.totalAmount)];
  });

  const tableBottomY = table(
    doc,
    { x: left, y: y + 6, w: pageW },
    ['Mes', 'Pedidos', 'Ventas ($)'],
    monthRows
  );

  y = tableBottomY + 20;

  // Top 3 productos
  doc.fontSize(13).fillColor(THEME.text).text('Top 3 productos por unidades', left, y);
  y += 8;

  const top = overview.topProductsBar || [];
  if (!top.length) {
    doc.fontSize(10).fillColor(THEME.muted).text('Sin datos en el período seleccionado.', left, y + 6);
    y += 26;
  } else {
    const maxUnits = Math.max(...top.map((t) => Number(t.units || 0)));
    const rowH = 26;
    top.forEach((t, i) => {
      const yyLocal = y + 6 + i * rowH;
      const name = (t.productName || 'Desconocido').slice(0, 40);
      doc.fontSize(10).fillColor(THEME.text).text(name, left, yyLocal);

      const barX = left + 220;
      const barW = pageW - 260;
      miniBar(doc, barX, yyLocal + 2, barW, 10, Number(t.units || 0), maxUnits, THEME.accent);

      doc.fontSize(10).fillColor(THEME.muted).text(integer(t.units || 0), left + pageW - 40, yyLocal, {
        width: 40,
        align: 'right',
      });
    });
    y += rowH * top.length + 18;
  }

  // Resumen
  doc.fontSize(13).fillColor(THEME.text).text('Resumen de productos y pedidos', left, y);
  y += 18;

  const soldUnits = overview?.pieProducts?.soldUnits || 0;

  // ✅ Stock vencido del período (expiredStock). Fallback a expiredProducts viejo.
  const expiredStock =
    Number(overview?.expiredStock ?? 0) ||
    Number(overview?.expiredProducts ?? 0) ||
    Number(overview?.pieProducts?.expiredUnits ?? 0) ||
    0;

  const compl = overview?.pieOrders?.completedOrders || 0;
  const claim = overview?.pieOrders?.claimedOrders || 0;

  const cardW = Math.floor((pageW - 14) / 2);
  const cardH = 72;

  doc.save().roundedRect(left, y, cardW, cardH, 12).fill(THEME.card).restore();
  doc.fontSize(11).fillColor(THEME.muted).text('Productos', left + 12, y + 12);
  doc.fontSize(12)
    .fillColor(THEME.primary).text(`Vendidos (unid.): ${integer(soldUnits)}`, left + 12, y + 34)
    .fillColor('#EF4444').text(`Stock vencido: ${integer(expiredStock)}`, left + 12, y + 52);

  const rightX = left + cardW + 14;
  doc.save().roundedRect(rightX, y, cardW, cardH, 12).fill(THEME.card).restore();
  doc.fontSize(11).fillColor(THEME.muted).text('Pedidos', rightX + 12, y + 12);
  doc.fontSize(12)
    .fillColor(THEME.accent).text(`Realizados: ${integer(compl)}`, rightX + 12, y + 36, { continued: true })
    .fillColor('#EF4444').text(`   Reclamados: ${integer(claim)}`);

  doc.end();
  try { footerNumbering(doc); } catch {}
};
