// src/controllers/customerComplain.js

const CustomerComplain = require('../models/customerComplain');
const Order = require('../models/order');
const OrderHistory = require('../models/orderHistory');
const { sequelize } = require('../database');

const fs = require('fs');
const path = require('path');

exports.createCustomerComplain = async (req, res) => {
  try {
    const customerComplain = await CustomerComplain.create(req.body);
    res.status(201).json(customerComplain);
  } catch (error) {
    console.error('Error creating CustomerComplain:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.findAllCustomerComplains = async (req, res) => {
  try {
    const customerComplains = await CustomerComplain.findAll();
    res.status(200).json(customerComplains);
  } catch (error) {
    console.error('Error fetching CustomerComplains:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.findCustomerComplainById = async (req, res) => {
  try {
    const { id } = req.params;
    const customerComplain = await CustomerComplain.findByPk(id);
    if (!customerComplain) {
      return res.status(404).json({ error: 'CustomerComplain not found with id: ' + id });
    }
    res.status(200).json(customerComplain);
  } catch (error) {
    console.error('Error fetching CustomerComplain by ID:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.updateCustomerComplain = async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;

    const customerComplain = await CustomerComplain.findByPk(id);
    if (!customerComplain) {
      return res.status(404).json({ error: 'CustomerComplain not found with id: ' + id });
    }

    await CustomerComplain.update(body, { where: { id } });
    const updatedCustomerComplain = await CustomerComplain.findByPk(id);

    res.status(200).json(updatedCustomerComplain);
  } catch (error) {
    console.error('Error updating CustomerComplain:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.deleteCustomerComplain = async (req, res) => {
  try {
    const { id } = req.params;
    const customerComplain = await CustomerComplain.findByPk(id);
    if (!customerComplain) {
      return res.status(404).json({ error: 'CustomerComplain not found with id: ' + id });
    }
    await CustomerComplain.destroy({ where: { id } });
    res.status(200).json(customerComplain);
  } catch (error) {
    console.error('Error deleting CustomerComplain:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.findCustomerComplainByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const customerComplains = await CustomerComplain.findCustomerComplainByUserId(userId);
    if (!customerComplains) {
      return res.status(404).json({ message: 'No complains found for this user.' });
    }
    res.status(200).json(customerComplains);
  } catch (error) {
    console.error('Error fetching CustomerComplains by User ID:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.findCustomerComplainByCommerceId = async (req, res) => {
  try {
    const { commerceId } = req.params;
    const customerComplains = await CustomerComplain.findCustomerComplainByCommerceId(commerceId);
    if (!customerComplains) {
      return res.status(404).json({ message: 'No complains found for this commerce.' });
    }
    res.status(200).json(customerComplains);
  } catch (error) {
    console.error('Error fetching CustomerComplains by Commerce ID:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.findCustomerComplainByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;
    const customerComplain = await CustomerComplain.findCustomerComplainByOrderId(orderId);
    if (!customerComplain) {
      return res.status(404).json({ message: 'No complain found for this order.' });
    }
    res.status(200).json(customerComplain);
  } catch (error) {
    console.error('Error fetching CustomerComplain by Order ID:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.setCustomerComplainSatisfaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { answer } = req.query;

    const normalized = String(answer || '').trim().toUpperCase();
    if (normalized !== 'Y' && normalized !== 'N') {
      return res.status(400).send('Respuesta inválida');
    }

    // Leemos el HTML una sola vez (fuera de la transacción)
    const html = fs.readFileSync(
      path.join(__dirname, '../templates/satisfaction.html'),
      'utf8'
    );

    await sequelize.transaction(async (t) => {
      const complain = await CustomerComplain.findByPk(id, { transaction: t });
      if (!complain) {
        const err = new Error('Reclamo no encontrado');
        err.statusCode = 404;
        throw err;
      }

      // ✅ Update del reclamo
      await complain.update(
        {
          was_satisfactory: normalized === 'Y',
          satisfaction_answered_at: new Date(),
        },
        { transaction: t }
      );

      // ✅ NUEVO: si es satisfactorio, actualizar orden a RESOLVED + history
      if (normalized === 'Y') {
        const orderId = complain.order_id; // consistente con tu createCustomerComplainForOrder

        if (!orderId) {
          const err = new Error('El reclamo no tiene order_id asociado');
          err.statusCode = 409;
          throw err;
        }

        const order = await Order.findByPk(orderId, { transaction: t });
        if (!order) {
          const err = new Error(`Order not found with id: ${orderId}`);
          err.statusCode = 404;
          throw err;
        }

        order.status = 'RESOLVED';
        await order.save({ transaction: t });

        await OrderHistory.create(
          { order_id: order.id, status: 'RESOLVED' },
          { transaction: t }
        );
      }
    });

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(html);

  } catch (error) {
    console.error('Error saving satisfaction:', error);

    if (error.statusCode === 404) {
      return res.status(404).send(error.message);
    }
    if (error.statusCode === 409) {
      return res.status(409).send(error.message);
    }

    return res.status(500).send('Error interno');
  }
};
