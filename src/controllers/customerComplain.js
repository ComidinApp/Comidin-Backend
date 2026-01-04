const CustomerComplain = require('../models/customerComplain');

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

const fs = require('fs');
const path = require('path');

exports.setCustomerComplainSatisfaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { answer } = req.query;

    const normalized = String(answer || '').trim().toUpperCase();
    if (normalized !== 'Y' && normalized !== 'N') {
      return res.status(400).send('Respuesta inválida');
    }

    const complain = await CustomerComplain.findByPk(id);
    if (!complain) {
      return res.status(404).send('Reclamo no encontrado');
    }

    await complain.update({
      was_satisfactory: normalized === 'Y',
      satisfaction_answered_at: new Date(),
    });

    const html = fs.readFileSync(
      path.join(__dirname, '../templates/satisfaction.html'),
      'utf8'
    );

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(html);

  } catch (error) {
    console.error('Error saving satisfaction:', error);
    return res.status(500).send('Error interno');
  }
};
