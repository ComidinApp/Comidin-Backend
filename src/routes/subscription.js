const express = require('express');
const Subscription = require('../controllers/subscription');
const router = express.Router();

router.post('/', Subscription.createSubscription);
router.get('/', Subscription.findAllSubscriptions);
router.get('/:id', Subscription.findSubscriptionById);
router.put('/:id', Subscription.updateSubscription);
router.delete('/:id', Subscription.deleteSubscription);
// find subscription by plan 
// find subscription by commerce 

module.exports = router;
