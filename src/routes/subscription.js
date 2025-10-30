// src/routes/subscription.js
const express = require('express');
const { validationResult } = require('express-validator');

// ---- Controllers
const Ctrl = require('../controllers/subscription');

// ---- Validators
const V = require('../validators/subscriptionValidation');

const router = express.Router();

/** Devuelve errores de validación en JSON */
function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors || errors.isEmpty()) return next();
  return res.status(400).json({ errors: errors.array() });
}

/**
 * Helper: garantiza que la referencia exista y sea función.
 * Si no existe, devuelve un handler que responde 500 con mensaje claro.
 */
function must(fn, name) {
  if (typeof fn === 'function') return fn;
  console.error(`[subscriptions routes] Missing ${name} (got: ${typeof fn}). Revisa exports en controllers/validators.`);
  return (_req, res) =>
    res.status(500).json({ error: 'Controller/Validator missing', missing: name });
}

/** Log de diagnóstico al inicio (una sola vez) */
(function sanityCheck() {
  const requiredControllers = [
    'normalizeBody',
    'createSubscription',
    'confirmSubscription',
    'downgradeToFree',
    'findAllSubscriptions',
    'findSubscriptionsByPlanId',
    'findSubscriptionsByCommerceId',
    'findSubscriptionById',
    'updateSubscription',
    'deleteSubscription',
  ];
  for (const k of requiredControllers) {
    if (typeof Ctrl[k] !== 'function') {
      console.error(`[subscriptions routes] Controller missing: ${k}`);
    }
  }

  const requiredValidators = [
    'createSubscriptionValidation',
    'updateSubscriptionValidation',
    'planIdValidation',
    'commerceIdValidation',
  ];
  for (const k of requiredValidators) {
    if (!Array.isArray(V[k])) {
      console.error(`[subscriptions routes] Validator missing or not array: ${k}`);
    }
  }
})();

/* ================== RUTAS ================== */

// Crear suscripción → genera link de MP o init_point de plan (fallback)
router.post(
  '/',
  must(Ctrl.normalizeBody, 'Ctrl.normalizeBody'),
  ...(Array.isArray(V.createSubscriptionValidation) ? V.createSubscriptionValidation : []),
  must(validate, 'validate'),
  must(Ctrl.createSubscription, 'Ctrl.createSubscription')
);

// Confirmar suscripción al volver de MP (soporta preapproval_id o búsqueda)
router.post(
  '/confirm',
  must(Ctrl.normalizeBody, 'Ctrl.normalizeBody'),
  must(Ctrl.confirmSubscription, 'Ctrl.confirmSubscription')
);

// Pasar al plan gratuito (upsert plan_id = 1)
router.post(
  '/free',
  must(Ctrl.normalizeBody, 'Ctrl.normalizeBody'),
  must(Ctrl.downgradeToFree, 'Ctrl.downgradeToFree')
);

// Todas
router.get(
  '/',
  must(Ctrl.findAllSubscriptions, 'Ctrl.findAllSubscriptions')
);

// Por plan
router.get(
  '/plan/:planId',
  ...(Array.isArray(V.planIdValidation) ? V.planIdValidation : []),
  must(validate, 'validate'),
  must(Ctrl.findSubscriptionsByPlanId, 'Ctrl.findSubscriptionsByPlanId')
);

// Por comercio
router.get(
  '/commerce/:commerceId',
  ...(Array.isArray(V.commerceIdValidation) ? V.commerceIdValidation : []),
  must(validate, 'validate'),
  must(Ctrl.findSubscriptionsByCommerceId, 'Ctrl.findSubscriptionsByCommerceId')
);

// Por id puntual
router.get(
  '/:id',
  must(Ctrl.findSubscriptionById, 'Ctrl.findSubscriptionById')
);

// Update por id
router.put(
  '/:id',
  ...(Array.isArray(V.updateSubscriptionValidation) ? V.updateSubscriptionValidation : []),
  must(validate, 'validate'),
  must(Ctrl.updateSubscription, 'Ctrl.updateSubscription')
);

// Delete por id
router.delete(
  '/:id',
  must(Ctrl.deleteSubscription, 'Ctrl.deleteSubscription')
);

module.exports = router;
