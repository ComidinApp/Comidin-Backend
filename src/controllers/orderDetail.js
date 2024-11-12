const OrderDetail = require('../models/orderDetail');

exports.createOrderDetail = async (req, res) => {
  try {
    const { body } = req;
    const orderDetail = await OrderDetail.create(body);
    res.status(201).json(orderDetail);
  } catch (error) {
    console.error('Error creating OrderDetail:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.findAllOrderDetails = async (req, res) => {
  try {
    const orderDetails = await OrderDetail.findAll();
    res.status(200).json(orderDetails);
  } catch (error) {
    console.error('Error fetching OrderDetails:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.findOrderDetailById = async (req, res) => {
  try {
    const { id } = req.params;
    const orderDetail = await OrderDetail.findByPk(id);
    if (orderDetail) {
      res.status(200).json(orderDetail);
    } else {
      res.status(404).json({ error: `OrderDetail not found with id: ${id}` });
    }
  } catch (error) {
    console.error('Error fetching OrderDetail by ID:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.updateOrderDetail = async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;
    const orderDetail = await OrderDetail.findByPk(id);
    if (orderDetail) {
      await orderDetail.update(body);
      res.status(200).json(orderDetail);
    } else {
      res.status(404).json({ error: `OrderDetail not found with id: ${id}` });
    }
  } catch (error) {
    console.error('Error updating OrderDetail:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.deleteOrderDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const orderDetail = await OrderDetail.findByPk(id);
    if (orderDetail) {
      await orderDetail.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: `OrderDetail not found with id: ${id}` });
    }
  } catch (error) {
    console.error('Error deleting OrderDetail:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.findOrderDetailsByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;
    const orderDetails = await OrderDetail.findOrderDetailsByOrderId(orderId);
    if (orderDetails.length) {
      res.status(200).json(orderDetails);
    } else {
      res.status(404).json({ message: 'No order details found for this order.' });
    }
  } catch (error) {
    console.error('Error fetching OrderDetails by Order ID:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.findOrderDetailsByPublicationId = async (req, res) => {
  try {
    const { publicationId } = req.params;
    const orderDetails = await OrderDetail.findOrderDetailsByPublicationId(publicationId);
    if (orderDetails.length) {
      res.status(200).json(orderDetails);
    } else {
      res.status(404).json({ message: 'No order details found for this publication.' });
    }
  } catch (error) {
    console.error('Error fetching OrderDetails by Publication ID:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};
