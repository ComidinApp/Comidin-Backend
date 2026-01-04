// src/controllers/order.js
const { sequelize } = require('../database');
const Order = require('../models/order');
const OrderDetail = require('../models/orderDetail');
const Employee = require('../models/employee');
const CustomerComplain = require('../models/customerComplain');
const emailSender = require('../services/emailSender');
const Publication = require('../models/publication');
const OrderHistory = require('../models/orderHistory');

exports.createOrder = async (req, res) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const { details, ...orderData } = req.body;

      const order = await Order.create(orderData, { transaction: t });

      await OrderHistory.create(
        {
          order_id: order.id,
          status: 'PENDING',
        },
        { transaction: t }
      );

      const orderDetails = details.map((detail) => ({
        ...detail,
        order_id: order.id,
      }));

      await OrderDetail.bulkCreate(orderDetails, { transaction: t });

      for (const detail of orderDetails) {
        const quantity = Number(detail.quantity);
        const publicationId = detail.publication_id;

        if (!publicationId || !quantity || Number.isNaN(quantity)) continue;

        await Publication.decrement('available_stock', {
          by: quantity,
          where: { id: publicationId },
          transaction: t,
        });
      }

      return order;
    });

    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating Order:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.findAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching Orders:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.findOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOrderById(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found with id: ' + id });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching Order by ID:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found with id: ' + id });
    }
    await order.update(body);
    res.status(200).json(order);
  } catch (error) {
    console.error('Error updating Order:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.changeOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    await sequelize.transaction(async (t) => {
      const order = await Order.findByPk(id, { transaction: t });
      if (!order) {
        const err = new Error('Order not found');
        err.statusCode = 404;
        throw err;
      }

      order.status = status;
      await order.save({ transaction: t });

      await OrderHistory.create(
        {
          order_id: order.id,
          status,
        },
        { transaction: t }
      );

      res.status(200).json(order);
    });
  } catch (error) {
    if (error && error.statusCode === 404) {
      return res.status(404).json({ error: 'Order not found with id: ' + req.params.id });
    }
    console.error('Error updating Order:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found with id: ' + id });
    }
    await order.destroy();
    res.status(200).json(order);
  } catch (error) {
    console.error('Error deleting Order:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.findOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.findOrdersByUserId(userId);
    if (!orders) {
      return res.status(404).json({ message: 'No orders found for this user.' });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching Orders by User ID:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.findOrdersByCommerceId = async (req, res) => {
  try {
    const { commerceId } = req.params;
    const orders = await Order.findOrdersByCommerceId(commerceId);
    if (!orders) {
      return res.status(404).json({ message: 'No orders found for this commerce.' });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching Orders by Commerce ID:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

/**
 * Crear reclamo de cliente a partir de un order_id
 * Endpoint: POST /order/:id/complain
 * Body: { message?: string }
 */
exports.createCustomerComplainForOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body || {};

    const orderFull = await Order.findOrderById(id);
    if (!orderFull) {
      return res.status(404).json({ error: 'Order not found with id: ' + id });
    }

    const complainDescription =
      message && message.trim().length > 0
        ? message.trim()
        : 'Sin descripción proporcionada';

    const customerComplain = await sequelize.transaction(async (t) => {
      const order = await Order.findByPk(id, { transaction: t });
      if (!order) {
        const err = new Error('Order not found');
        err.statusCode = 404;
        throw err;
      }

      order.status = 'CLAIMED';
      await order.save({ transaction: t });

      await OrderHistory.create(
        { order_id: order.id, status: 'CLAIMED' },
        { transaction: t }
      );

      return CustomerComplain.create(
        {
          user_id: order.user_id,
          commerce_id: order.commerce_id,
          order_id: order.id,
          complain_description: complainDescription,
        },
        { transaction: t }
      );
    });

    // ✅ NUEVO: Traer empleados del comercio con roles 1,5,6
    const employeesToNotify = await Employee.findEmployeesByCommerceIdAndRoleIds(
      orderFull.commerce_id,
      [1, 5, 6]
    );

    try {
      // ✅ NUEVO: Enviar a todos los empleados (opción A: 1 mail por empleado)
      await emailSender.sendCustomerComplainCommerceToEmployees({
        order: orderFull,
        user: orderFull.user,
        commerce: orderFull.commerce,
        employees: employeesToNotify,
        complain: customerComplain,
      });

      // Este se mantiene igual (asumiendo que existe)
      await emailSender.sendCustomerComplainCustomer({
        order: orderFull,
        user: orderFull.user,
        commerce: orderFull.commerce,
        complain: customerComplain,
      });
    } catch (mailError) {
      console.error('Error sending customer complain emails:', mailError);
    }

    return res.status(201).json({
      message: 'Customer complain created successfully',
      complain: customerComplain,
    });
  } catch (error) {
    if (error && error.statusCode === 404) {
      return res.status(404).json({ error: 'Order not found with id: ' + req.params.id });
    }
    console.error('Error creating CustomerComplain from Order:', error);
    return res.status(409).json({ error: 'Conflict', meesage: error });
  }
};
