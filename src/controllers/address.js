const Address = require('../models/address');

exports.createAddress = async (req, res) => {
  try {
    const address = await Address.create(req.body);
    res.status(201).json(address);
  } catch (error) {
    console.error('Error creating Address:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.findAllAddresses = async (req, res) => {
  try {
    const addresses = await Address.findAll();
    res.status(200).json(addresses);
  } catch (error) {
    console.error('Error fetching Addresses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.findAddressById = async (req, res) => {
  try {
    const address = await Address.findByPk(req.params.id);
    if (address) {
      res.status(200).json(address);
    } else {
      res.status(404).json({ error: 'Address not found' });
    }
  } catch (error) {
    console.error('Error fetching Address:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const [updated] = await Address.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedAddress = await Address.findByPk(req.params.id);
      res.status(200).json(updatedAddress);
    } else {
      res.status(404).json({ error: 'Address not found' });
    }
  } catch (error) {
    console.error('Error updating Address:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const deleted = await Address.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Address not found' });
    }
  } catch (error) {
    console.error('Error deleting Address:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.findAddressesByUserId = async (req, res) => {
  try {
    const addresses = await Address.findAddressesByUserId(req.params.userId);
    res.status(200).json(addresses);
  } catch (error) {
    console.error('Error finding Addresses by User ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
