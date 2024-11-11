const Order = require('../models/order');

exports.createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json(order);
    } catch (error) {
        console.error('Error creating Order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.findAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching Orders:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.findOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found with id: ' + id });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching Order by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
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
        res.status(500).json({ error: 'Internal Server Error' });
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
        res.status(500).json({ error: 'Internal Server Error' });
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
        res.status(500).json({ error: 'Internal Server Error' });
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
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
