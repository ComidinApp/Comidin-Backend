const analyticsService = require('../services/analyticsService');

exports.getOverview = async (req, res) => {
  try {
    const role = req.user?.role || 'employee';
    const userCommerceId = req.user?.commerceId;
    const { period = 'last30d' } = req.query;

    // Si es admin puede consultar otro commerceId vía query param
    const commerceId = (role === 'admin' && req.query.commerceId)
      ? Number(req.query.commerceId)
      : Number(userCommerceId);

    if (!commerceId) {
      return res.status(400).json({ message: 'commerceId no disponible en el contexto' });
    }

    const data = await analyticsService.getOverview({
      commerceId,
      period,                    // 'last30d' | 'prev_month'
      validStatuses: ['PAID','DELIVERED'],
      timezone: 'America/Argentina/Buenos_Aires'
    });

    return res.json(data);
  } catch (err) {
    console.error('[analyticsController.getOverview] Error:', err);
    return res.status(500).json({ message: 'Error obteniendo métricas', error: err?.message });
  }
};
