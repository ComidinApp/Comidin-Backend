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

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

router.post('/', Subscription.normalizeBody, createSubscriptionValidation, validate, Subscription.createSubscription);

// NUEVO
router.post('/confirm', Subscription.normalizeBody, Subscription.confirmSubscription);

// Opcional
router.post('/webhook', express.json({ type: '*/*' }), Subscription.webhook);

router.get('/', Subscription.findAllSubscriptions?.bind?.(Subscription) || ((_, res) => res.sendStatus(501)));
router.put('/:id', updateSubscriptionValidation, validate, Subscription.updateSubscription?.bind?.(Subscription) || ((_, res) => res.sendStatus(501)));
router.delete('/:id', Subscription.deleteSubscription?.bind?.(Subscription) || ((_, res) => res.sendStatus(501)));
router.get('/plan/:planId', planIdValidation, validate, Subscription.findSubscriptionsByPlanId?.bind?.(Subscription) || ((_, res) => res.sendStatus(501)));
router.get('/commerce/:commerceId', commerceIdValidation, validate, Subscription.findSubscriptionsByCommerceId?.bind?.(Subscription) || ((_, res) => res.sendStatus(501)));
router.get('/:id', Subscription.findSubscriptionById?.bind?.(Subscription) || Subscription.getSubscriptionStatus);

module.exports = router;
