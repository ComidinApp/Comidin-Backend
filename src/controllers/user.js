
const User = require('../models/user');

const createUser = async (req, res) => {
    try {
        const { body } = req;
        const user = new User(body);
        await user.save();
        return res.status(201).json(user);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

const findAllUsers = async (req, res) => {
    try {
        const users = await User.findAll()
        return res.status(200).json(users);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const findUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found with id:' + id });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found with id:' + id });
        }
        await user.update(body);
        return res.status(201).json(user);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found with id:' + id });
        }
        await user.destroy()
        return res.status(200).json(user);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

module.exports =  {createUser, updateUser, deleteUser, findAllUsers, findUserById};