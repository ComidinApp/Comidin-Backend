const OrderDetail = require('../models/orderDetail');

const createOrderDetail = async (req, res) => {
    try {
        const { body } = req;
        const orderDetail = new OrderDetail(body);
        await orderDetail.save();
        return res.status(201).json(orderDetail);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

const findAllOrderDetails = async (req, res) => {
    try {
        const orderDetail = await OrderDetail.findAll()
        return res.status(200).json(orderDetail);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const findOrderDetailById = async (req, res) => {
    try {
        const { id } = req.params;
        const orderDetail = await OrderDetail.findByPk(id);
        if (!orderDetail) {
            return res.status(404).json({ error: 'OrderDetail not found with id:' + id });
        }
        return res.status(200).json(orderDetail);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const updateOrderDetail = async (req, res) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const orderDetail = await OrderDetail.findByPk(id);
        if (!orderDetail) {
            return res.status(404).json({ error: 'OrderDetail not found with id:' + id });
        }
        await OrderDetail.update(body);
        return res.status(201).json(orderDetail);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const deleteOrderDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const orderDetail = await OrderDetail.findByPk(id);
        if (!orderDetail) {
            return res.status(404).json({ error: 'OrderDetail not found with id:' + id });
        }
        await OrderDetail.destroy()
        return res.status(200).json(orderDetail);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

module.exports =  {createOrderDetail, updateOrderDetail, deleteOrderDetail, findAllOrderDetails, findOrderDetailById};