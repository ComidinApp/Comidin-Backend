
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

const findRatingByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const ratings = await Rating.findCustomerComplainByUserId(userId);
        if (!ratings) {
            return res.status(404).json({ message: 'No ratings found for this user.' });
        }
        return res.status(200).json(ratings);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
};
const findRatingComplainByCommerceId = async (req, res) => {
    try {
        const { commerceId } = req.params;
        const ratings = await Rating.findCustomerComplainByCommerceId(commerceId);
        if (!ratings) {
            return res.status(404).json({ message: 'No ratings found for this commerce.' });
        }
        return res.status(200).json(ratings);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
};
const findRatingByOrderId = async (req, res) => {
    try {
        const { orderId } = req.params;
        const rating = await Rating.findCustomerComplainByOrderId(orderId);
        if (!rating) {
            return res.status(404).json({ message: 'No rating found for this order.' });
        }
        return res.status(200).json(rating);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
};

module.exports =  {createRating, updateRating, deleteRating, findAllRatings, findRatingById, findRatingByUserId, findRatingComplainByCommerceId, findRatingByOrderId};