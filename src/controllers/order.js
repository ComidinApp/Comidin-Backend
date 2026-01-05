// src/controllers/order.js
const { sequelize } = require('../database');
const Order = require('../models/order');
const OrderDetail = require('../models/orderDetail');
const getEmployeeModel = () => require('../models/employee'); // ✅ lazy require
const CustomerComplain = require('../models/customerComplain');
const emailSender = require('../services/emailSender');
const Publication = require('../models/publication');
const OrderHistory = require('../models/orderHistory');

/**
 * =========================
 * CREATE ORDER
 * =========================
 */
exports.createOrder = async (req, res) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const { details, ...orderData } = req.body;

      const order = await Order.create(orderData, { transaction: t });

      await OrderHistory.create(
        { order_id: order.id, status: 'PENDING' },
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
    res.status(409).json({ error: 'Conflict', message: error });
  }
};

/**
 * =========================
 * FIND ORDERS
 * =========================
 */
exports.findAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching Orders:', error);
    res.status(409).json({ error: 'Conflict', message: error });
  }
};

exports.findOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOrderById(id);

    if (!order) {
      return res.status(404).json({ error: `Order not found with id: ${id}` });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching Order by ID:', error);
    res.status(409).json({ error: 'Conflict', message: error });
  }
};

/**
 * =========================
 * UPDATE / DELETE
 * =========================
 */
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ error: `Order not found with id: ${id}` });
    }

    await order.update(req.body);
    res.status(200).json(order);
  } catch (error) {
    console.error('Error updating Order:', error);
    res.status(409).json({ error: 'Conflict', message: error });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ error: `Order not found with id: ${id}` });
    }

    await order.destroy();
    res.status(200).json(order);
  } catch (error) {
    console.error('Error deleting Order:', error);
    res.status(409).json({ error: 'Conflict', message: error });
  }
};

/**
 * =========================
 * CHANGE STATUS
 * =========================
 */
exports.changeOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const normalizedStatus = (status || '').toString().trim().toUpperCase();

    await sequelize.transaction(async (t) => {
      const order = await Order.findByPk(id, { transaction: t });
      if (!order) {
        const err = new Error('Order not found');
        err.statusCode = 404;
        throw err;
      }

      order.status = normalizedStatus;
      await order.save({ transaction: t });

      await OrderHistory.create(
        { order_id: order.id, status: normalizedStatus },
        { transaction: t }
      );
    });

    // ✅ Mail AFTER commit (si falla el mail, no te rompe la actualización del pedido)
    try {
      await emailSender.sendOrderStatusUpdateCustomer({
        orderId: id,
        newStatus: normalizedStatus,
      });
    } catch (mailError) {
      console.error('Order status updated but email failed:', mailError);
    }

    res.status(200).json({ message: 'Order status updated successfully' });
  } catch (error) {
    if (error.statusCode === 404) {
      return res.status(404).json({ error: `Order not found with id: ${req.params.id}` });
    }

    console.error('Error updating Order status:', error);
    res.status(409).json({ error: 'Conflict', message: error });
  }
};


/**
 * =========================
 * FIND BY USER / COMMERCE
 * =========================
 */
exports.findOrdersByUserId = async (req, res) => {
  try {
    const orders = await Order.findOrdersByUserId(req.params.userId);
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching Orders by User ID:', error);
    res.status(409).json({ error: 'Conflict', message: error });
  }
};

exports.findOrdersByCommerceId = async (req, res) => {
  try {
    const orders = await Order.findOrdersByCommerceId(req.params.commerceId);
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching Orders by Commerce ID:', error);
    res.status(409).json({ error: 'Conflict', message: error });
  }
};

/**
 * =========================
 * CREATE CUSTOMER COMPLAIN
 * Endpoint: POST /order/:id/complain
 * =========================
 */
exports.createCustomerComplainForOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body || {};

    const orderFull = await Order.findOrderById(id);
    if (!orderFull) {
      return res.status(404).json({ error: `Order not found with id: ${id}` });
    }

    const complainDescription =
      message && message.trim() ? message.trim() : 'Sin descripción proporcionada';

    const customerComplain = await sequelize.transaction(async (t) => {
      const order = await Order.findByPk(id, { transaction: t });

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

    // ✅ lazy-load Employee model
    const Employee = getEmployeeModel();

    // ✅ roles 1,5,6
    const employeesToNotify =
      await Employee.findEmployeesByCommerceIdAndRoleIds(
        orderFull.commerce_id,
        [1, 5, 6]
      );

try {
  await emailSender.sendCustomerComplainCommerceToEmployees({
    order: orderFull,
    user: orderFull.user,
    commerce: orderFull.commerce,
    employees: employeesToNotify,
    complain: customerComplain,
  });

  const contactEmployee =
    (employeesToNotify && employeesToNotify.length > 0) ? employeesToNotify[0] : null;

  await emailSender.sendCustomerComplainCustomer({
    order: orderFull,
    user: orderFull.user,
    commerce: orderFull.commerce,
    complain: customerComplain,
    contactEmployee,
  });
} catch (mailError) {
  console.error('Error sending customer complain emails:', mailError);
}


    res.status(201).json({
      message: 'Customer complain created successfully',
      complain: customerComplain,
    });
  } catch (error) {
    console.error('Error creating CustomerComplain from Order:', error);
    res.status(409).json({ error: 'Conflict', message: error });
  }
};
