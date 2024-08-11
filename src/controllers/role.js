
const Role = require('../models/role');

const createRole = async (req, res) => {
    try {
        const { body } = req;
        const role = new Role(body);
        await role.save();
        return res.status(201).json(role);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

const findAllRoles = async (req, res) => {
    try {
        const roles = await Role.findAll()
        return res.status(200).json(roles);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const findRoleById = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await Role.findByPk(id);
        if (!role) {
            return res.status(404).json({ error: 'role not found with id:' + id });
        }
        return res.status(200).json(role);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const updateRole = async (req, res) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const role = await Role.findByPk(id);
        if (!role) {
            return res.status(404).json({ error: 'role not found with id:' + id });
        }
        await role.update(body);
        return res.status(201).json(role);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const deleteRole = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await Role.findByPk(id);
        if (!role) {
            return res.status(404).json({ error: 'role not found with id:' + id });
        }
        await role.destroy()
        return res.status(200).json(role);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

module.exports =  {createRole, updateRole, deleteRole, findAllRoles, findRoleById};