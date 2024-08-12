
const Payment = require('../models/payment');

const createPayment = async (req, res) => {
    try {
        const { body } = req;
        const payment = new Payment(body);
        await payment.save();
        return res.status(201).json(payment);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

const findAllPayments = async (req, res) => {
    try {
        const payments = await Payment.findAll()
        return res.status(200).json(payments);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const findPaymentById = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await Payment.findByPk(id);
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found with id:' + id });
        }
        return res.status(200).json(payment);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const updatePayment = async (req, res) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const payment = await Payment.findByPk(id);
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found with id:' + id });
        }
        await payment.update(body);
        return res.status(201).json(payment);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const deletePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await Payment.findByPk(id);
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found with id:' + id });
        }
        await payment.destroy()
        return res.status(200).json(payment);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

module.exports =  {createPayment, updatePayment, deletePayment, findAllPayments, findPaymentById};