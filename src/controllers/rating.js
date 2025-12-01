const Rating = require('../models/rating');

exports.createRating = async (req, res) => {
  try {
    const { body } = req;
    const rating = await Rating.create(body);
    res.status(201).json(rating);
  } catch (error) {
    console.error('Error creating Rating:', error);
    res.status(409).json({ error: 'Conflict', message: error.message || error });
  }
};

exports.findAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.findAll();
    res.status(200).json(ratings);
  } catch (error) {
    console.error('Error fetching Ratings:', error);
    res.status(409).json({ error: 'Conflict', message: error.message || error });
  }
};

exports.findRatingById = async (req, res) => {
  try {
    const { id } = req.params;
    const rating = await Rating.findByPk(id);
    rating
      ? res.status(200).json(rating)
      : res.status(404).json({ error: `Rating not found with id: ${id}` });
  } catch (error) {
    res.status(409).json({ error: 'Conflict', message: error.message || error });
  }
};

exports.updateRating = async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;
    const rating = await Rating.findByPk(id);
    if (rating) {
      await rating.update(body);
      res.status(200).json(rating);
    } else {
      res.status(404).json({ error: `Rating not found with id: ${id}` });
    }
  } catch (error) {
    res.status(409).json({ error: 'Conflict', message: error.message || error });
  }
};

exports.deleteRating = async (req, res) => {
  try {
    const { id } = req.params;
    const rating = await Rating.findByPk(id);
    if (rating) {
      await rating.destroy();
      res.status(200).json({ message: 'Rating successfully deleted' });
    } else {
      res.status(404).json({ error: `Rating not found with id: ${id}` });
    }
  } catch (error) {
    res.status(409).json({ error: 'Conflict', message: error.message || error });
  }
};

exports.findRatingByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const ratings = await Rating.findRatingsByUserId(userId);
    ratings.length
      ? res.status(200).json(ratings)
      : res.status(404).json({ message: 'No ratings found for this user.' });
  } catch (error) {
    res.status(409).json({ error: 'Conflict', message: error.message || error });
  }
};

exports.findRatingComplainByCommerceId = async (req, res) => {
  try {
    const { commerceId } = req.params;
    const ratings = await Rating.findRatingsByCommerceId(commerceId);

    if (!ratings.length) {
      return res.status(404).json({ message: 'No ratings found for this commerce.' });
    }

    const total = ratings.length;
    const avg = ratings.reduce((a, r) => a + Number(r.rate_order), 0) / total;

    res.status(200).json({
      commerceId: Number(commerceId),
      averageRating: Number(avg.toFixed(2)),
      totalRatings: total,
      ratings,
    });
  } catch (error) {
    res.status(409).json({ error: 'Conflict', message: error.message || error });
  }
};

exports.findRatingByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;
    const rating = await Rating.findRatingByOrderId(orderId);
    rating
      ? res.status(200).json(rating)
      : res.status(404).json({ message: 'No rating found for this order.' });
  } catch (error) {
    res.status(409).json({ error: 'Conflict', message: error.message || error });
  }
};
