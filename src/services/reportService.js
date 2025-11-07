// src/services/reportService.js
const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');
const { Op, fn, col, where } = require('sequelize');
const fs = require('fs');
const path = require('path');

let Models;
try { Models = require('../models'); } catch { Models = require('../../models'); }
const { order: Order, publication: Publication } = Models;

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
  if (mode === 'all') return { startDate: null, endDate: new Date(), months: 0 };
  const endDate = new Date();
  const startDate = new Date(endDate.getFullYear(), endDate.getMonth() - (months - 1), 1);
  return { startDate, endDate, months };
}
function computePrevWindow(window) {
  if (!window.startDate) return { startDate: null, endDate: null };
  const months = resolveMonths(`${window.months ?? 0}m`).months || 1;
  const prevEnd = new Date(window.startDate.getFullYear(), window.startDate.getMonth(), 0, 23, 59, 59, 999);
  const prevStart = new Date(prevEnd.getFullYear(), prevEnd.getMonth() - (months - 1), 1);
  return { startDate: prevStart, endDate: prevEnd };
}
function between(field, startDate, endDate) {
  if (!startDate || !endDate) return {};
  return { [field]: { [Op.between]: [startDate, endDate] } };
}
const ciStatusIn = (values) =>
  where(fn('LOWER', col('status')), { [Op.in]: values.map((v) => String(v).toLowerCase()) });

/* ==========================
   Constantes de estados (para KPIs por período)
   ========================== */
const DONE_STATUSES = ['PAID', 'DELIVERED', 'COMPLETED'];
const RETURN_STATUSES = ['CLAIMED', 'RETURNED'];

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
   KPIs por período + comparativas
   ========================== */
async function getPeriodKPIs({ commerceId, startDate, endDate }) {
  // Ventas totales (sum total_amount) con estados completados
  const revenueRow = await Order.findOne({
    attributes: [[fn('COALESCE', fn('SUM', col('total_amount')), 0), 'revenue']],
    where: {
      commerce_id: commerceId,
      ...between('created_at', startDate, endDate),
      [Op.and]: [ciStatusIn(DONE_STATUSES)],
    },
    raw: true,
  });
  const revenue = Number(revenueRow?.revenue ?? 0);

  // Pedidos realizados (DONE_STATUSES)
  const doneCount = await Order.count({
    where: {
      commerce_id: commerceId,
      ...between('created_at', startDate, endDate),
      [Op.and]: [ciStatusIn(DONE_STATUSES)],
    },
  });

  // Pedidos devueltos (RETURN_STATUSES)
  const returnedCount = await Order.count({
    where: {
      commerce_id: commerceId,
      ...between('created_at', startDate, endDate),
      [Op.and]: [ciStatusIn(RETURN_STATUSES)],
    },
  });

  // Productos vencidos: snapshot actual (no tiene sentido comparar por período porque es estado a la fecha)
  // De todas formas lo devolvemos para mostrarlo.
  const expiredRows = await Publication.findAll({
    attributes: [[fn('COALESCE', fn('SUM', col('available_stock')), 0), 'expiredStock']],
    where: { commerce_id: commerceId, expiration_date: { [Op.lt]: new Date() } },
    raw: true,
  });
  const expiredProducts = Number(expiredRows?.[0]?.expiredStock ?? 0);

  return { revenue, doneCount, returnedCount, expiredProducts };
}

function pctChange(curr, prev) {
  const delta = curr - prev;
  if (!prev || prev === 0) {
    return { delta, pct: prev === 0 && curr !== 0 ? 100 : 0, dir: delta >= 0 ? 'up' : 'down' };
  }
  const pct = (delta / prev) * 100;
  return { delta, pct, dir: delta >= 0 ? 'up' : 'down' };
}

/* ==========================
   PDF estilizado (R1)
   ========================== */
// Tema corporativo (Comidín)
const THEME = {
  primary: '#00B8D9', // celeste/teal
  accent:  '#FF8C00', // naranja
  text:    '#222222',
  muted:   '#6B7280',
  border:  '#E5E7EB',
  card:    '#F7FAFC',
};

// Resolver primera ruta existente (logo)
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

/* ===== Helpers de dibujo ===== */

// Header “1-D”: franja superior + logo centrado + títulos centrados
function headerCentered(doc, title, subtitle, options = {}) {
  const { logoPath } = options;
  const { width } = doc.page;
  const left = doc.page.margins.left;
  const usable = width - left - doc.page.margins.right;

  // franja superior
  doc.save().rect(0, 0, width, 8).fill(THEME.primary).restore();

  // LOGO centrado con tamaño controlado y buen espaciado
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

  // Título y subtítulo centrados
  doc
    .fontSize(20)
    .fillColor(THEME.text)
    .text(title, left, y + 6, { width: usable, align: 'center' });

  doc
    .fontSize(10)
    .fillColor(THEME.muted)
    .text(subtitle, left, y + 30, { width: usable, align: 'center' });

  // separador
  const sepY = y + 52;
  doc
    .moveTo(left, sepY)
    .lineTo(left + usable, sepY)
    .lineWidth(1)
    .strokeColor(THEME.border)
    .stroke();

  return sepY + 12;
}

function footerNumbering(doc) {
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

function kpiCardWithDelta(doc, x, y, w, h, label, valueStr, deltaInfo, color = THEME.primary) {
  // tarjeta base
  doc.save().roundedRect(x, y, w, h, 12).fill(THEME.card).restore();
  doc.save().roundedRect(x, y, 6, h, 12).fill(color).restore();

  // label
  doc.fillColor(THEME.muted).fontSize(10).text(label, x + 14, y + 12, { width: w - 20 });

  // value
  doc.fillColor(THEME.text).fontSize(18).text(valueStr, x + 14, y + 30, { width: w - 20 });

  // delta
  if (deltaInfo) {
    const arrow = deltaInfo.dir === 'up' ? '↑' : '↓';
    const c = deltaInfo.dir === 'up' ? '#16A34A' : '#DC2626'; // verde / rojo
    const pctStr = `${arrow} ${Math.abs(deltaInfo.pct).toFixed(1)}%`;
    doc.fillColor(c).fontSize(10).text(pctStr, x + 14, y + 54, { width: w - 20 });
  }
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
    if (zebra && idx % 2 === 1) {
      doc.save().rect(x, yy, w, rowH).fill('#FAFAFA').restore();
    }
    let cx2 = x;
    r.forEach((cell, i) => {
      doc.fillColor(THEME.text).fontSize(10).text(String(cell ?? ''), cx2 + 8, yy + 6, {
        width: colWidths[i], ellipsis: true,
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

/* ====== Informe PDF ====== */
exports.streamExecutivePDF = async (res, { period, statusPreset, overview, context }) => {
  const doc = new PDFDocument({ margin: 40, size: 'A4', bufferPages: true });
  doc.pipe(res);

  const nowStr = new Date().toLocaleString('es-AR');
  const title = 'Informe de Ventas';
  const subtitle =
    `Comercio: ${context.commerceId}  •  Período: ${period}  •  Estado: ${statusPreset}  •  Generado: ${nowStr}`;

  // Header 1-D
  let y = headerCentered(doc, title, subtitle, { logoPath: LOGO_PATH });

  const pageW = doc.page.width - doc.page.margins.left - doc.page.margins.right;
  const left = doc.page.margins.left;

  const currency = (v) => `$ ${Number(v || 0).toLocaleString('es-AR', { minimumFractionDigits: 2 })}`;
  const integer  = (v) => Number(v || 0).toLocaleString('es-AR');

  // ===== KPIs por período actual y anterior =====
  const curWindow = computeWindow(period);
  const prevWindow = computePrevWindow(curWindow);

  let currKPIs = { revenue: 0, doneCount: 0, returnedCount: 0, expiredProducts: overview?.expiredProducts ?? 0 };
  let prevKPIs  = { revenue: 0, doneCount: 0, returnedCount: 0 };

  if (curWindow.startDate && curWindow.endDate) {
    currKPIs = await getPeriodKPIs({
      commerceId: context.commerceId,
      startDate: curWindow.startDate,
      endDate: curWindow.endDate,
    });
  }
  if (prevWindow.startDate && prevWindow.endDate) {
    prevKPIs = await getPeriodKPIs({
      commerceId: context.commerceId,
      startDate: prevWindow.startDate,
      endDate: prevWindow.endDate,
    });
  }

  const revDelta   = pctChange(currKPIs.revenue,       prevKPIs.revenue);
  const doneDelta  = pctChange(currKPIs.doneCount,     prevKPIs.doneCount);
  const retDelta   = pctChange(currKPIs.returnedCount, prevKPIs.returnedCount);

  // KPI Cards (2x2) con delta
  const kpiW = Math.floor((pageW - 24) / 2);
  const kpiH = 70;

  kpiCardWithDelta(doc, left, y, kpiW, kpiH, 'Ventas totales', currency(currKPIs.revenue), revDelta, THEME.primary);
  kpiCardWithDelta(doc, left + kpiW + 24, y, kpiW, kpiH, 'Pedidos realizados', integer(currKPIs.doneCount), doneDelta, THEME.accent);

  y += kpiH + 14;

  kpiCardWithDelta(doc, left, y, kpiW, kpiH, 'Pedidos devueltos', integer(currKPIs.returnedCount), retDelta, '#EF4444');
  kpiCardWithDelta(doc, left + kpiW + 24, y, kpiW, kpiH, 'Productos vencidos', integer(currKPIs.expiredProducts), null, '#F59E0B');

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
      const barW = pageW - 260; // margen para número
      miniBar(doc, barX, yyLocal + 2, barW, 10, Number(t.units || 0), maxUnits, THEME.accent);

      doc.fontSize(10).fillColor(THEME.muted).text(integer(t.units || 0), left + pageW - 40, yyLocal, {
        width: 40, align: 'right',
      });
    });
    y += rowH * top.length + 18;
  }

  // Resumen claro
  doc.fontSize(13).fillColor(THEME.text).text('Resumen de productos y pedidos', left, y);
  y += 18;

  const sold = overview?.pieProducts?.soldUnits || 0;
  const expi = overview?.pieProducts?.expiredUnits || 0;
  const compl = overview?.pieOrders?.completedOrders || 0;
  const claim = overview?.pieOrders?.claimedOrders || 0;

  const cardW = Math.floor((pageW - 14) / 2);
  const cardH = 72;

  // Productos
  doc.save().roundedRect(left, y, cardW, cardH, 12).fill(THEME.card).restore();
  doc.fontSize(11).fillColor(THEME.muted).text('Productos', left + 12, y + 12);
  doc.fontSize(12)
    .fillColor(THEME.primary).text(`Vendidos: ${integer(sold)}`, left + 12, y + 36, { continued: true })
    .fillColor('#EF4444').text(`   Vencidos: ${integer(expi)}`);

  // Pedidos
  const rightX = left + cardW + 14;
  doc.save().roundedRect(rightX, y, cardW, cardH, 12).fill(THEME.card).restore();
  doc.fontSize(11).fillColor(THEME.muted).text('Pedidos', rightX + 12, y + 12);
  doc.fontSize(12)
    .fillColor(THEME.accent).text(`Realizados: ${integer(compl)}`, rightX + 12, y + 36, { continued: true })
    .fillColor('#EF4444').text(`   Devueltos: ${integer(claim)}`);

  // Finalizar y numerar
  doc.end();
  try { footerNumbering(doc); } catch {}
};
