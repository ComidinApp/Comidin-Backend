const express = require('express');
const Order = require('../controllers/order');
const router = express.Router();

router.post('/', Order.createOrder);
router.get('/', Order.findAllOrders);
router.get('/:id', Order.findOrderById);
router.put('/:id', Order.updateOrder);
router.delete('/:id', Order.deleteOrder);

module.exports = router;
