const express = require('express');
const OrderDetail = require('../controllers/orderDetail');
const router = express.Router();

router.post('/', OrderDetail.createOrderDetail);
router.get('/', OrderDetail.findAllOrderDetails);
router.get('/:id', OrderDetail.findOrderDetailById);
router.put('/:id', OrderDetail.updateOrderDetail);
router.delete('/:id', OrderDetail.deleteOrderDetail);
router.get('/order/:orderId', OrderDetail.findOrderDetailsByOrderId);
router.get('/publication/:publicationId', OrderDetail.findOrderDetailsByPublicationId);

module.exports = router;
