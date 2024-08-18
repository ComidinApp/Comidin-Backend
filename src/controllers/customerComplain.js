const CustomerComplain = require('../models/customerComplain');

const createCustomerComplain = async (req, res) => {
    try {
        const { body } = req;
        const customerComplain = new CustomerComplain(body);
        await customerComplain.save();
        return res.status(201).json(customerComplain);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

const findAllCustomerComplains = async (req, res) => {
    try {
        const customerComplain = await CustomerComplain.findAll()
        return res.status(200).json(customerComplain);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const findCustomerComplainById = async (req, res) => {
    try {
        const { id } = req.params;
        const customerComplain = await CustomerComplain.findByPk(id);
        if (!customerComplain) {
            return res.status(404).json({ error: 'CustomerComplain not found with id:' + id });
        }
        return res.status(200).json(customerComplain);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const updateCustomerComplain = async (req, res) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const customerComplain = await CustomerComplain.findByPk(id);
        if (!customerComplain) {
            return res.status(404).json({ error: 'CustomerComplain not found with id:' + id });
        }
        await CustomerComplain.update(body);
        return res.status(201).json(customerComplain);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const deleteCustomerComplain = async (req, res) => {
    try {
        const { id } = req.params;
        const customerComplain = await CustomerComplain.findByPk(id);
        if (!customerComplain) {
            return res.status(404).json({ error: 'CustomerComplain not found with id:' + id });
        }
        await CustomerComplain.destroy()
        return res.status(200).json(customerComplain);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const findCustomerComplainByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const customerComplains = await CustomerComplain.findCustomerComplainByUserId(userId);
        if (!customerComplains) {
            return res.status(404).json({ message: 'No complains found for this user.' });
        }
        return res.status(200).json(customerComplains);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
};

const findCustomerComplainByCommerceId = async (req, res) => {
    try {
        const { commerceId } = req.params;
        const customerComplains = await CustomerComplain.findCustomerComplainByCommerceId(commerceId);
        if (!customerComplains) {
            return res.status(404).json({ message: 'No complains found for this commerce.' });
        }
        return res.status(200).json(customerComplains);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
};

const findCustomerComplainByOrderId = async (req, res) => {
    try {
        const { orderId } = req.params;
        const customerComplain = await CustomerComplain.findCustomerComplainByOrderId(orderId);
        if (!customerComplain) {
            return res.status(404).json({ message: 'No complain found for this order.' });
        }
        return res.status(200).json(customerComplain);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
};

module.exports =  {createCustomerComplain, updateCustomerComplain, deleteCustomerComplain, findAllCustomerComplains, findCustomerComplainById, findCustomerComplainByUserId, findCustomerComplainByCommerceId, findCustomerComplainByOrderId};