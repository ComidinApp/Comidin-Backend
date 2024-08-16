const express = require('express');
const Subscription = require('../controllers/subscription');
const router = express.Router();

router.post('/', Subscription.createSubscription);
router.get('/', Subscription.findAllSubscriptions);
router.get('/:id', Subscription.findSubscriptionById);
router.put('/:id', Subscription.updateSubscription);
router.delete('/:id', Subscription.deleteSubscription);
router.get('/plan/:planId', Subscription.findSubscriptionsByPlanId);
router.get('/commerce/:commerceId', Subscription.findSubscriptionsByCommerceId);

module.exports = router;
