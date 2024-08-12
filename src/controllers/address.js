const Address = require('../models/address');

const createAddress = async (req, res) => {
    try {
        const { body } = req;
        const address = new Address(body);
        await address.save();
        return res.status(201).json(address);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

const findAllAddresses = async (req, res) => {
    try {
        const addresss = await Address.findAll()
        return res.status(200).json(addresss);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const findAddressById = async (req, res) => {
    try {
        const { id } = req.params;
        const address = await Address.findByPk(id);
        if (!address) {
            return res.status(404).json({ error: 'address not found with id:' + id });
        }
        return res.status(200).json(address);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const updateAddress = async (req, res) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const address = await Address.findByPk(id);
        if (!address) {
            return res.status(404).json({ error: 'address not found with id:' + id });
        }
        await address.update(body);
        return res.status(201).json(address);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const deleteAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const address = await Address.findByPk(id);
        if (!address) {
            return res.status(404).json({ error: 'address not found with id:' + id });
        }
        await address.destroy()
        return res.status(200).json(address);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

module.exports =  {createAddress, updateAddress, deleteAddress, findAllAddresses, findAddressById};