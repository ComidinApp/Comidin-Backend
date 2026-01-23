// src/controllers/analyticsReportController.js
const analyticsService = require('../services/analyticsService');
const reportService = require('../services/reportService');

exports.getExecutiveReportPDF = async (req, res) => {
  try {
    const role = req.user?.role || 'employee';
    const { period = 'last3m', status = 'open', commerceId: commerceIdParam } = req.query;

    const allowPublic = process.env.ALLOW_PUBLIC_ANALYTICS === 'true';
    const tokenCommerceId = Number(req.user?.commerceId ?? req.user?.commerce_id);
    const queryCommerceId = Number(commerceIdParam);

    let commerceId;
    if (Number.isFinite(tokenCommerceId)) commerceId = tokenCommerceId;
    else if (role === 'admin' && Number.isFinite(queryCommerceId)) commerceId = queryCommerceId;
    else if (allowPublic && Number.isFinite(queryCommerceId)) commerceId = queryCommerceId;

    if (!Number.isFinite(commerceId)) {
      return res.status(400).json({ message: 'commerceId no disponible en el contexto' });
    }

    // Presets de estados (igual que controller original)
    const STATUS_PRESETS = {
      valid: ['DELIVERED', 'COMPLETED'],
      open:  ['DELIVERED', 'COMPLETED', 'PENDING'],
      all:   'ALL',
    };
    const preset = String(status).toLowerCase();
    const validStatuses = STATUS_PRESETS[preset] ?? STATUS_PRESETS.open;

    // Traemos el overview para alimentar el PDF
    const overview = await analyticsService.getOverview({
      commerceId,
      period,
      validStatuses,
      timezone: 'America/Argentina/Buenos_Aires',
    });

    // Generamos y streameamos el PDF
    const filename = `informe-ejecutivo-${commerceId}-${period}.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    return reportService.streamExecutivePDF(res, {
      period,
      statusPreset: preset,
      overview,
      context: { commerceId },
    });
  } catch (err) {
    console.error('[getExecutiveReportPDF] Error:', err);
    return res.status(500).json({ message: 'No se pudo generar el PDF', error: err?.message });
  }
};

exports.getOrdersExportXLSX = async (req, res) => {
  try {
    const role = req.user?.role || 'employee';
    const { period = 'last3m', status = 'all', commerceId: commerceIdParam } = req.query;

    const allowPublic = process.env.ALLOW_PUBLIC_ANALYTICS === 'true';
    const tokenCommerceId = Number(req.user?.commerceId ?? req.user?.commerce_id);
    const queryCommerceId = Number(commerceIdParam);

    let commerceId;
    if (Number.isFinite(tokenCommerceId)) commerceId = tokenCommerceId;
    else if (role === 'admin' && Number.isFinite(queryCommerceId)) commerceId = queryCommerceId;
    else if (allowPublic && Number.isFinite(queryCommerceId)) commerceId = queryCommerceId;

    if (!Number.isFinite(commerceId)) {
      return res.status(400).json({ message: 'commerceId no disponible en el contexto' });
    }

    // Igual preset que en overview (por defecto exportamos TODO: status = all)
    const STATUS_PRESETS = {
      valid: ['DELIVERED', 'COMPLETED'],
      open:  ['DELIVERED', 'COMPLETED', 'PENDING'],
      all:   'ALL',
    };
    const preset = String(status).toLowerCase();
    const validStatuses = STATUS_PRESETS[preset] ?? STATUS_PRESETS.all;

    // Pedidos del período (lista detallada)
    const rows = await reportService.getOrdersForExport({
      commerceId,
      period,
      validStatuses,
    });

    const filename = `ordenes-${commerceId}-${period}.xlsx`;
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    const buffer = await reportService.buildOrdersXLSX(rows, { period, status: preset });
    return res.end(buffer);
  } catch (err) {
    console.error('[getOrdersExportXLSX] Error:', err);
    return res.status(500).json({ message: 'No se pudo generar el Excel', error: err?.message });
  }
};
