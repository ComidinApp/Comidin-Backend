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
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/', 
  createSubscriptionValidation, 
  validate, 
  Subscription.createSubscription
);

router.get('/', 
  Subscription.findAllSubscriptions
);

router.put('/:id', 
  updateSubscriptionValidation, 
  validate, 
  Subscription.updateSubscription
);

router.delete('/:id', 
  Subscription.deleteSubscription
);

router.get('/plan/:planId', 
  planIdValidation, 
  validate, 
  Subscription.findSubscriptionsByPlanId
);

router.get('/commerce/:commerceId', 
  commerceIdValidation, 
  validate, 
  Subscription.findSubscriptionsByCommerceId
);

router.get('/:id', 
  Subscription.findSubscriptionById
);

module.exports = router;

