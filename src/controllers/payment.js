const Payment = require('../models/payment');

exports.createPayment = async (req, res) => {
  try {
    const { body } = req;
    const payment = await Payment.create(body);
    res.status(201).json(payment);
  } catch (error) {
    console.error('Error creating Payment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.findAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.status(200).json(payments);
  } catch (error) {
    console.error('Error fetching Payments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.findPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByPk(id);
    if (payment) {
      res.status(200).json(payment);
    } else {
      res.status(404).json({ error: `Payment not found with id: ${id}` });
    }
  } catch (error) {
    console.error('Error fetching Payment by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;
    const payment = await Payment.findByPk(id);
    if (payment) {
      await payment.update(body);
      res.status(200).json(payment);
    } else {
      res.status(404).json({ error: `Payment not found with id: ${id}` });
    }
  } catch (error) {
    console.error('Error updating Payment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByPk(id);
    if (payment) {
      await payment.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: `Payment not found with id: ${id}` });
    }
  } catch (error) {
    console.error('Error deleting Payment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
