const analyticsService = require('../services/analyticsService');

exports.getOverview = async (req, res) => {
  try {
    const role = req.user?.role || 'employee';

    // period: last30d | prev_month | all | custom
    // status: open (incluye pending) | valid | all
    const {
      period = 'last30d',
      status = 'open',
      commerceId: commerceIdParam,

      // ✅ NUEVO: rango personalizado (YYYY-MM-DD)
      startDate,
      endDate,
    } = req.query;

    const allowPublic = process.env.ALLOW_PUBLIC_ANALYTICS === 'true';

    const tokenCommerceId = Number(req.user?.commerceId ?? req.user?.commerce_id);
    const queryCommerceId = Number(commerceIdParam);

    let commerceId;

    if (Number.isFinite(tokenCommerceId)) {
      // caso normal: viene del JWT
      commerceId = tokenCommerceId;
    } else if (role === 'admin' && Number.isFinite(queryCommerceId)) {
      // admin siempre puede consultar por query
      commerceId = queryCommerceId;
    } else if (allowPublic && Number.isFinite(queryCommerceId)) {
      // bypass de testing
      commerceId = queryCommerceId;
    }

    if (!Number.isFinite(commerceId)) {
      return res.status(400).json({ message: 'commerceId no disponible en el contexto' });
    }

    // Presets de estados
    const STATUS_PRESETS = {
      valid: ['DELIVERED', 'COMPLETED'],             // ventas concretadas
      open:  ['DELIVERED', 'COMPLETED', 'PENDING'],  // incluye pendientes
      all:   'ALL',                                  // sin filtro por estado
    };
    const preset = String(status).toLowerCase();
    const validStatuses = STATUS_PRESETS[preset] ?? STATUS_PRESETS.open;

    const data = await analyticsService.getOverview({
      commerceId,
      period,         // 'last30d' | 'prev_month' | 'all' | 'custom'
      startDate,      // ✅ si period=custom
      endDate,        // ✅ si period=custom
      validStatuses,  // dinámico según query
      timezone: 'America/Argentina/Buenos_Aires',
    });

    return res.json(data);
  } catch (err) {
    const msg = err?.message || 'Error obteniendo métricas';
    console.error('[analyticsController.getOverview] Error:', err);

    // ✅ si es error de rango custom, es 400 (input inválido), no 500
    const isCustomInvalid =
      String(msg).toLowerCase().includes('período custom inválido') ||
      String(msg).toLowerCase().includes('periodo custom invalido') ||
      String(msg).toLowerCase().includes('custom inválido') ||
      String(msg).toLowerCase().includes('custom invalido');

    return res
      .status(isCustomInvalid ? 400 : 500)
      .json({ message: 'Error obteniendo métricas', error: msg });
  }
};
