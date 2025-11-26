const express = require('express');
const { validationResult } = require('express-validator');
const Order = require('../controllers/order');
const {
  createOrderValidation,
  updateOrderValidation,
  userIdValidation,
  commerceIdValidation,
} = require('../validators/orderValidation');

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/', createOrderValidation, validate, Order.createOrder);
router.get('/', Order.findAllOrders);
router.get('/:id', Order.findOrderById);
router.put('/:id', updateOrderValidation, validate, Order.updateOrder);
router.put('/status/:id', Order.changeOrderStatus);
router.delete('/:id', Order.deleteOrder);
router.get('/user/:userId', userIdValidation, validate, Order.findOrdersByUserId);
router.get('/commerce/:commerceId', commerceIdValidation, validate, Order.findOrdersByCommerceId);

// 🆕 Reclamo de cliente basado en un order_id
// POST /order/:id/complain
router.post('/:id/complain', Order.createCustomerComplainForOrder);

module.exports = router;
