const express = require('express');
const { validationResult } = require('express-validator');
const OrderDetail = require('../controllers/orderDetail');
const {
  createOrderDetailValidation,
  updateOrderDetailValidation,
  orderIdValidation,
  publicationIdValidation,
} = require('../validators/orderDetailValidation');
const router = express.Router();
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/', createOrderDetailValidation, validate, OrderDetail.createOrderDetail);
router.get('/', OrderDetail.findAllOrderDetails);
router.get('/:id', OrderDetail.findOrderDetailById);
router.put('/:id', updateOrderDetailValidation, validate, OrderDetail.updateOrderDetail);
router.delete('/:id', OrderDetail.deleteOrderDetail);
router.get('/order/:orderId', orderIdValidation, validate, OrderDetail.findOrderDetailsByOrderId);
router.get('/publication/:publicationId', publicationIdValidation, validate, OrderDetail.findOrderDetailsByPublicationId);

module.exports = router;
