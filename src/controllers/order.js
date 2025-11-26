// src/controllers/order.js
const Order = require('../models/order');
const OrderDetail = require('../models/orderDetail');
const Employee = require('../models/employee');
const CustomerComplain = require('../models/customerComplain');
const emailSender = require('../services/emailSender');

exports.createOrder = async (req, res) => {
    try {
        const { details, ...orderData } = req.body;
        const order = await Order.create(orderData);
        const orderDetails = details.map((detail) => ({
            ...detail,
            order_id: order.id,
        }));
        await OrderDetail.bulkCreate(orderDetails);
        res.status(201).json(order);
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
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found with id: ' + id });
        }
        order.status = status;
        await order.save();
        res.status(200).json(order);
    } catch (error) {
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
 * 🆕 Crear reclamo de cliente a partir de un order_id
 * Endpoint: POST /order/:id/complain
 * Body: { message?: string }
 */
exports.createCustomerComplainForOrder = async (req, res) => {
    try {
        const { id } = req.params;       // order_id
        const { message } = req.body || {};

        // 1) Traigo el pedido con user + commerce + detalles
        const order = await Order.findOrderById(id);

        if (!order) {
            return res.status(404).json({ error: 'Order not found with id: ' + id });
        }

        // 2) Actualizo estado de la orden a CLAIMED (o el que definas)
        order.status = 'CLAIMED'; // si usás otro literal, cambialo acá
        await order.save();

        // 3) Creo el registro en customer_complain
        const complainDescription =
            message && message.trim().length > 0
                ? message.trim()
                : 'Sin descripción proporcionada';

        const customerComplain = await CustomerComplain.create({
            user_id: order.user_id,
            commerce_id: order.commerce_id,
            order_id: order.id,
            complain_description: complainDescription,
        });

        // 4) Busco el empleado administrador (Propietario) del comercio
        const adminEmployee = await Employee.findAdminEmployeeByCommerceId(order.commerce_id);

        // 5) Envío mails (no corto la respuesta si falla el mail, solo logueo)
        try {
            await emailSender.sendCustomerComplainCommerce({
                order,
                user: order.user,
                commerce: order.commerce,
                adminEmployee,
                complain: customerComplain,
            });

            await emailSender.sendCustomerComplainCustomer({
                order,
                user: order.user,
                commerce: order.commerce,
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
        console.error('Error creating CustomerComplain from Order:', error);
        return res.status(409).json({ error: 'Conflict', meesage: error });
    }
};
