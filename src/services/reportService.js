// src/services/reportService.js
const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');
const { Op, fn, col, where } = require('sequelize');
const fs = require('fs');
const path = require('path');

let Models;
try { Models = require('../models'); } catch { Models = require('../../models'); }
const { order: Order } = Models;

/* ==========================
   Helpers de período
   ========================== */
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

/* ==========================
   Excel (R6) robusto al esquema
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

  const { map, attributes } = pickOrderAttributes();

  const orders = await Order.findAll({
    attributes,
    where: whereOrder,
    order: [ map.created_at ? [map.created_at, 'ASC'] : ['id', 'ASC'] ],
    raw: true,
  });

  return orders.map((o) => ({
    orderId: o.id,
    date: map.created_at ? o[map.created_at] : null,
    status: map.status ? o[map.status] : '',
    total: map.total_amount ? Number(o[map.total_amount] ?? 0) : 0,
    paymentMethod: map.payment_method ? (o[map.payment_method] ?? '') : '',
    customerName: map.customer_name ? (o[map.customer_name] ?? '') : '',
    customerEmail: map.customer_email ? (o[map.customer_email] ?? '') : '',
  }));
};

exports.buildOrdersXLSX = async (rows, meta = {}) => {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet('Órdenes');

  const hasPayment = rows.some(r => r.paymentMethod);
  const hasCustName = rows.some(r => r.customerName);
  const hasCustMail = rows.some(r => r.customerEmail);

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
    ws.addRow({
      ...r,
      date: r.date ? new Date(r.date) : null,
    });
  });

  const dateCol = ws.getColumn('date');
  if (dateCol) dateCol.numFmt = 'dd/mm/yyyy hh:mm';

  const totalCol = ws.getColumn('total');
  if (totalCol) totalCol.numFmt = '"$" #,##0.00';

  ws.getRow(1).font = { bold: true };

  const metaSheet = wb.addWorksheet('Meta');
  metaSheet.addRow(['Período', String(meta.period || '')]);
  metaSheet.addRow(['Filtro estado', String(meta.status || '')]);
  metaSheet.getRow(1).font = { bold: true };
  metaSheet.getRow(2).font = { bold: true };

  return wb.xlsx.writeBuffer();
};

/* ==========================
   PDF estilizado (R1)
   ========================== */
// Tema visual
const THEME = {
  primary: '#00B8D9',
  accent:  '#FF8C00',
  text:    '#222222',
  muted:   '#6B7280',
  border:  '#E5E7EB',
  card:    '#F7FAFC',
};

// Resolver primera ruta existente (logo / fuentes)
function resolveFirstExisting(candidates = []) {
  for (const pth of candidates) {
    if (!pth) continue;
    try {
      if (fs.existsSync(pth)) return pth;
    } catch {}
  }
  return null;
}

// Candidatos de rutas (ajustados a tu contenedor: /comidin suele ser el root)
const LOGO_PATH = resolveFirstExisting([
  '/comidin/assets/logo.png',
  '/app/assets/logo.png',
  path.resolve(__dirname, '../../assets/logo.png'),
  path.resolve(__dirname, '../assets/logo.png'),
  path.resolve(process.cwd(), 'assets/logo.png'),
]);

const FONT_REGULAR = resolveFirstExisting([
  '/comidin/assets/fonts/Roboto-Regular.ttf',
  '/app/assets/fonts/Roboto-Regular.ttf',
  path.resolve(__dirname, '../../assets/fonts/Roboto-Regular.ttf'),
  path.resolve(__dirname, '../assets/fonts/Roboto-Regular.ttf'),
]);
const FONT_BOLD = resolveFirstExisting([
  '/comidin/assets/fonts/Roboto-Bold.ttf',
  '/app/assets/fonts/Roboto-Bold.ttf',
  path.resolve(__dirname, '../../assets/fonts/Roboto-Bold.ttf'),
  path.resolve(__dirname, '../assets/fonts/Roboto-Bold.ttf'),
]);

function header(doc, title, subtitle, options = {}) {
  const { logoPath } = options;
  const { width } = doc.page;
  const left = doc.page.margins.left;
  const right = width - doc.page.margins.right;

  // barra superior
  doc.save()
    .rect(0, 0, width, 6)
    .fill(THEME.primary)
    .restore();

  // logo (opcional)
  let cursorX = left;
  if (logoPath) {
    try {
      doc.image(logoPath, left, 18, { width: 110, fit: [110, 28] });
      cursorX = left + 124;
    } catch { /* si no carga, seguimos */ }
  }

  doc
    .fontSize(18)
    .fillColor(THEME.text)
    .text(title, cursorX, 16, { continued: false });

  doc
    .fontSize(10)
    .fillColor(THEME.muted)
    .text(subtitle, left, 44);

  // línea divisoria
  doc
    .moveTo(left, 64)
    .lineTo(right, 64)
    .lineWidth(1)
    .strokeColor(THEME.border)
    .stroke();

  doc.moveDown(1);
}

function footer(doc) {
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    const { width, height, margins } = doc.page;
    const text = `Página ${i + 1} de ${range.count}`;
    doc
      .fontSize(9)
      .fillColor(THEME.muted)
      .text(text, margins.left, height - margins.bottom + 8, {
        width: width - margins.left - margins.right,
        align: 'right',
      });
  }
}

function kpiCard(doc, x, y, w, h, label, value, color = THEME.primary) {
  // tarjeta
  doc
    .save()
    .roundedRect(x, y, w, h, 10)
    .fillOpacity(1)
    .fill(THEME.card)
    .restore();

  // borde lateral
  doc
    .save()
    .roundedRect(x, y, 6, h, 10)
    .fillColor(color)
    .fill()
    .restore();

  // textos
  doc
    .fillColor(THEME.muted)
    .fontSize(10)
    .text(label, x + 14, y + 10, { width: w - 20 });

  doc
    .fillColor(THEME.text)
    .fontSize(18)
    .text(value, x + 14, y + 28, { width: w - 20 });
}

function table(doc, { x, y, w }, headers, rows, opts = {}) {
  const rowH = opts.rowHeight || 22;
  const zebra = opts.zebra !== false;
  const colWidths = opts.colWidths || headers.map(() => Math.floor(w / headers.length));

  // header
  doc
    .save()
    .rect(x, y, w, rowH)
    .fill(THEME.primary)
    .restore();

  let cx = x;
  headers.forEach((h, i) => {
    doc
      .fillColor('#fff')
      .fontSize(10)
      .text(h, cx + 8, y + 6, { width: colWidths[i], ellipsis: true });
    cx += colWidths[i];
  });

  // body
  let yy = y + rowH;
  rows.forEach((r, idx) => {
    if (zebra && idx % 2 === 0) {
      doc
        .save()
        .rect(x, yy, w, rowH)
        .fill('#FFFFFF')
        .restore();
    } else if (zebra) {
      doc
        .save()
        .rect(x, yy, w, rowH)
        .fill('#FAFAFA')
        .restore();
    }

    let cx2 = x;
    r.forEach((cell, i) => {
      doc
        .fillColor(THEME.text)
        .fontSize(10)
        .text(String(cell ?? ''), cx2 + 8, yy + 6, {
          width: colWidths[i],
          ellipsis: true,
        });
      cx2 += colWidths[i];
    });

    yy += rowH;
  });

  // borde externo
  doc
    .save()
    .lineWidth(1)
    .strokeColor(THEME.border)
    .rect(x, y, w, rowH + rows.length * rowH)
    .stroke()
    .restore();

  return yy;
}

function miniBar(doc, x, y, w, h, value, max, color) {
  const ratio = max > 0 ? Math.min(value / max, 1) : 0;
  const barW = Math.max(2, Math.round(w * ratio));

  // fondo
  doc
    .save()
    .roundedRect(x, y, w, h, 4)
    .fill('#F1F5F9')
    .restore();

  // barra
  doc
    .save()
    .roundedRect(x, y, barW, h, 4)
    .fill(color || THEME.accent)
    .restore();
}

exports.streamExecutivePDF = (res, { period, statusPreset, overview, context }) => {
  const doc = new PDFDocument({ margin: 40, size: 'A4', bufferPages: true });

  // Fuentes Roboto si existen, sino Helvetica
  try {
    if (FONT_REGULAR && FONT_BOLD) {
      doc.registerFont('Regular', FONT_REGULAR);
      doc.registerFont('Bold', FONT_BOLD);
      doc.font('Regular');
    }
  } catch {
    // fallback automático
  }

  doc.pipe(res);

  const nowStr = new Date().toLocaleString('es-AR');
  const title = 'Informe de Ventas';
  const subtitle = `Comercio: ${context.commerceId}  •  Período: ${period}  •  Estado: ${statusPreset}  •  Generado: ${nowStr}`;

  // Header
  header(doc, title, subtitle, {
    logoPath: LOGO_PATH, // si no existe, el try/catch del header lo omite
  });

  const pageW = doc.page.width - doc.page.margins.left - doc.page.margins.right;
  const left = doc.page.margins.left;
  let y = 80;

  const currency = (v) => `$ ${Number(v || 0).toLocaleString('es-AR', { minimumFractionDigits: 2 })}`;
  const integer  = (v) => Number(v || 0).toLocaleString('es-AR');

  // KPI Cards (2x2)
  const kpiW = Math.floor((pageW - 24) / 2);
  const kpiH = 64;

  kpiCard(doc, left, y, kpiW, kpiH, 'Ventas totales',     currency(overview.totalRevenue), THEME.primary);
  kpiCard(doc, left + kpiW + 24, y, kpiW, kpiH, 'Pedidos realizados', integer(overview.totalOrders), THEME.accent);

  y += kpiH + 14;

  kpiCard(doc, left, y, kpiW, kpiH, 'Pedidos devueltos',  integer(overview.returnedOrders), '#EF4444');
  kpiCard(doc, left + kpiW + 24, y, kpiW, kpiH, 'Productos vencidos', integer(overview.expiredProducts), '#F59E0B');

  y += kpiH + 26;

  // Ventas y pedidos por mes (tabla)
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
  y += 6;

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
      const barW = pageW - 260; // deja margen para el número
      miniBar(doc, barX, yyLocal + 2, barW, 10, Number(t.units || 0), maxUnits, THEME.accent);

      doc.fontSize(10).fillColor(THEME.muted).text(integer(t.units || 0), left + pageW - 40, yyLocal, {
        width: 40,
        align: 'right',
      });
    });
    y += rowH * top.length + 16;
  }

  // Resumen Productos/Pedidos
  doc.fontSize(13).fillColor(THEME.text).text('Resumen de productos y pedidos', left, y);
  y += 6;

  const sold = overview?.pieProducts?.soldUnits || 0;
  const expi = overview?.pieProducts?.expiredUnits || 0;
  const compl = overview?.pieOrders?.completedOrders || 0;
  const claim = overview?.pieOrders?.claimedOrders || 0;

  const boxW = Math.floor((pageW - 14) / 2);
  const boxH = 50;
  const drawStatBox = (x, label, v1, v2, color1, color2) => {
    doc.save().roundedRect(x, y + 10, boxW, boxH, 10).fill(THEME.card).restore();

    doc.fontSize(11).fillColor(THEME.muted).text(label, x + 12, y + 16);

    doc.fontSize(12).fillColor(color1).text(`A: ${integer(v1)}`, x + 12, y + 34, { continued: true })
      .fillColor(color2).text(`   B: ${integer(v2)}`);
  };

  drawStatBox(left, 'Productos', sold, expi, THEME.primary, '#EF4444');
  drawStatBox(left + boxW + 14, 'Pedidos',  compl, claim, THEME.accent,  '#EF4444');

  // Finaliza y numera páginas
  doc.end();
  try { footer(doc); } catch {}
};
