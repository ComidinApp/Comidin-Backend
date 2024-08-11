
const Rating = require('../models/raiting');

const createRaiting = async (req, res) => {
    try {
        const { body } = req;
        const raiting = new Rating(body);
        await raiting.save();
        return res.status(201).json(raiting);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

const findAllRaitings = async (req, res) => {
    try {
        const raitings = await Rating.findAll()
        return res.status(200).json(raitings);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const findRaitingById = async (req, res) => {
    try {
        const { id } = req.params;
        const raiting = await Rating.findByPk(id);
        if (!raiting) {
            return res.status(404).json({ error: 'raiting not found with id:' + id });
        }
        return res.status(200).json(raiting);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const updateRaiting = async (req, res) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const raiting = await Rating.findByPk(id);
        if (!raiting) {
            return res.status(404).json({ error: 'raiting not found with id:' + id });
        }
        await raiting.update(body);
        return res.status(201).json(raiting);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const deleteRaiting = async (req, res) => {
    try {
        const { id } = req.params;
        const raiting = await Rating.findByPk(id);
        if (!raiting) {
            return res.status(404).json({ error: 'raiting not found with id:' + id });
        }
        await raiting.destroy()
        return res.status(200).json(raiting);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

module.exports =  {createRaiting, updateRaiting, deleteRaiting, findRaitingById, findRaitingById};