
const Rating = require('../models/rating');

const createRating = async (req, res) => {
    try {
        const { body } = req;
        const rating = new Rating(body);
        await rating.save();
        return res.status(201).json(rating);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

const findAllRatings = async (req, res) => {
    try {
        const ratings = await Rating.findAll()
        return res.status(200).json(ratings);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const findRatingById = async (req, res) => {
    try {
        const { id } = req.params;
        const rating = await Rating.findByPk(id);
        if (!rating) {
            return res.status(404).json({ error: 'Rating not found with id:' + id });
        }
        return res.status(200).json(rating);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const updateRating = async (req, res) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const rating = await Rating.findByPk(id);
        if (!rating) {
            return res.status(404).json({ error: 'Rating not found with id:' + id });
        }
        await rating.update(body);
        return res.status(201).json(rating);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const deleteRating = async (req, res) => {
    try {
        const { id } = req.params;
        const rating = await Rating.findByPk(id);
        if (!rating) {
            return res.status(404).json({ error: 'Rating not found with id:' + id });
        }
        await rating.destroy()
        return res.status(200).json(rating);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

module.exports =  {createRating, updateRating, deleteRating, findAllRatings, findRatingById};