// routes/subscription.js
const express = require('express');
const { validationResult } = require('express-validator');
const Subscription = require('../controllers/subscription');
const {
  createSubscriptionValidation,
  updateSubscriptionValidation,
  planIdValidation,
  commerceIdValidation
} = require('../validators/subscriptionValidation');

const router = express.Router();

// helper para devolver errores de validación en formato JSON
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

// crear suscripción → genera el link de checkout de MP
router.post('/', Subscription.normalizeBody, createSubscriptionValidation, validate, Subscription.createSubscription);

// confirmar suscripción al volver de MP
router.post('/confirm', Subscription.normalizeBody, Subscription.confirmSubscription);

// pasar al plan gratuito (borra subs locales del comercio)
router.post('/free', Subscription.normalizeBody, Subscription.downgradeToFree);

// CRUD básico
router.get('/', Subscription.findAllSubscriptions?.bind?.(Subscription) || ((_, res) => res.sendStatus(501)));
router.put('/:id', updateSubscriptionValidation, validate, Subscription.updateSubscription?.bind?.(Subscription) || ((_, res) => res.sendStatus(501)));
router.delete('/:id', Subscription.deleteSubscription?.bind?.(Subscription) || ((_, res) => res.sendStatus(501)));

// filtros por plan o por comercio
router.get('/plan/:planId', planIdValidation, validate, Subscription.findSubscriptionsByPlanId?.bind?.(Subscription) || ((_, res) => res.sendStatus(501)));
router.get('/commerce/:commerceId', commerceIdValidation, validate, Subscription.findSubscriptionsByCommerceId?.bind?.(Subscription) || ((_, res) => res.sendStatus(501)));

// buscar por id puntual
router.get('/:id', Subscription.findSubscriptionById?.bind?.(Subscription) || Subscription.getSubscriptionStatus);

module.exports = router;
