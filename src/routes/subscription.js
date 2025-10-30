// src/routes/subscription.js
const express = require('express');
const { validationResult } = require('express-validator');

// Controladores
const Subscription = require('../controllers/subscription');

// Validaciones
const {
  createSubscriptionValidation,
  updateSubscriptionValidation,
  planIdValidation,
  commerceIdValidation,
} = require('../validators/subscriptionValidation');

const router = express.Router();

/** Devuelve errores de validación en JSON */
function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors || errors.isEmpty()) return next();
  return res.status(400).json({ errors: errors.array() });
}

/* ---- Rutas de negocio ---- */

// Crear suscripción → genera link de MP o init_point de plan (fallback)
router.post(
  '/',
  Subscription.normalizeBody,
  createSubscriptionValidation,
  validate,
  Subscription.createSubscription
);

// Confirmar suscripción al volver de MP (soporta preapproval_id o búsqueda)
router.post(
  '/confirm',
  Subscription.normalizeBody,
  Subscription.confirmSubscription
);

// Pasar al plan gratuito (upsert plan_id = 1)
router.post(
  '/free',
  Subscription.normalizeBody,
  Subscription.downgradeToFree
);

/* ---- Consultas/CRUD ---- */

// Todas
router.get('/', Subscription.findAllSubscriptions);

// Por plan
router.get(
  '/plan/:planId',
  planIdValidation,
  validate,
  Subscription.findSubscriptionsByPlanId
);

// Por comercio
router.get(
  '/commerce/:commerceId',
  commerceIdValidation,
  validate,
  Subscription.findSubscriptionsByCommerceId
);

// Por id puntual
router.get('/:id', Subscription.findSubscriptionById);

// Update por id
router.put(
  '/:id',
  updateSubscriptionValidation,
  validate,
  Subscription.updateSubscription
);

// Delete por id
router.delete('/:id', Subscription.deleteSubscription);

module.exports = router;
