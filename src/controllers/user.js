
const User = require('../models/user');

const createUser = async (req, res) => {
    try {
        const { body } = req;
        const user = new User(body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports =  {createUser};