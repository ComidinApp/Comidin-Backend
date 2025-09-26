const analyticsService = require('../services/analyticsService');

exports.getOverview = async (req, res) => {
  try {
    const role = req.user?.role || 'employee';
    const { period = 'last30d', commerceId: commerceIdParam } = req.query;

    // BYPASS de testing: permite query param si ALLOW_PUBLIC_ANALYTICS=true
    const allowPublic = process.env.ALLOW_PUBLIC_ANALYTICS === 'true';

    const tokenCommerceId = Number(req.user?.commerceId ?? req.user?.commerce_id);
    const queryCommerceId = Number(commerceIdParam);

    let commerceId;

    if (Number.isFinite(tokenCommerceId)) {
      commerceId = tokenCommerceId; // caso normal: viene del JWT
    } else if (role === 'admin' && Number.isFinite(queryCommerceId)) {
      commerceId = queryCommerceId; // admin siempre puede consultar por query
    } else if (allowPublic && Number.isFinite(queryCommerceId)) {
      commerceId = queryCommerceId; // bypass de testing
    }

    if (!Number.isFinite(commerceId)) {
      return res.status(400).json({ message: 'commerceId no disponible en el contexto' });
    }

    const data = await analyticsService.getOverview({
      commerceId,
      period, // 'last30d' | 'prev_month'
      validStatuses: ['PAID', 'DELIVERED'],
      timezone: 'America/Argentina/Buenos_Aires',
    });

    return res.json(data);
  } catch (err) {
    console.error('[analyticsController.getOverview] Error:', err);
    return res.status(500).json({ message: 'Error obteniendo métricas', error: err?.message });
  }
};
