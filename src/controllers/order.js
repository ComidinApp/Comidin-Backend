const Order = require('../models/order');

const createOrder = async (req, res) => {
    try {
        const { body } = req;
        const order = new Order(body);
        await order.save();
        return res.status(201).json(order);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

const findAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll()
        return res.status(200).json(orders);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const findOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found with id:' + id });
        }
        return res.status(200).json(order);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const updateOrder = async (req, res) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found with id:' + id });
        }
        await order.update(body);
        return res.status(201).json(order);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found with id:' + id });
        }
        await order.destroy()
        return res.status(200).json(order);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

module.exports =  {createOrder, updateOrder, deleteOrder, findAllOrders, findOrderById};