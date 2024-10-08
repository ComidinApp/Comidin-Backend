const Role = require('../models/role');

exports.createRole = async (req, res) => {
  try {
    const { body } = req;
    const role = await Role.create(body);
    res.status(201).json(role);
  } catch (error) {
    console.error('Error creating Role:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.findAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAllRoles();
    res.status(200).json(roles);
  } catch (error) {
    console.error('Error fetching Roles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.findRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);
    if (role) {
      res.status(200).json(role);
    } else {
      res.status(404).json({ error: `Role not found with id: ${id}` });
    }
  } catch (error) {
    console.error('Error fetching Role by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;
    const role = await Role.findByPk(id);
    if (role) {
      await role.update(body);
      res.status(200).json(role);
    } else {
      res.status(404).json({ error: `Role not found with id: ${id}` });
    }
  } catch (error) {
    console.error('Error updating Role:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);
    if (role) {
      await role.destroy();
      res.status(200).json({ message: 'Role successfully deleted' });
    } else {
      res.status(404).json({ error: `Role not found with id: ${id}` });
    }
  } catch (error) {
    console.error('Error deleting Role:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
