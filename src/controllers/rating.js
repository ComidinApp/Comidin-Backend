const Rating = require('../models/rating');

exports.createRating = async (req, res) => {
  try {
    const { body } = req;
    const rating = await Rating.create(body);
    res.status(201).json(rating);
  } catch (error) {
    console.error('Error creating Rating:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.findAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.findAll();
    res.status(200).json(ratings);
  } catch (error) {
    console.error('Error fetching Ratings:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.findRatingById = async (req, res) => {
  try {
    const { id } = req.params;
    const rating = await Rating.findByPk(id);
    if (rating) {
      res.status(200).json(rating);
    } else {
      res.status(404).json({ error: `Rating not found with id: ${id}` });
    }
  } catch (error) {
    console.error('Error fetching Rating by ID:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
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
    console.error('Error updating Rating:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
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
    console.error('Error deleting Rating:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.findRatingByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const ratings = await Rating.findRatingsByUserId(userId); 
    if (ratings && ratings.length > 0) {
      res.status(200).json(ratings);
    } else {
      res.status(404).json({ message: 'No ratings found for this user.' });
    }
  } catch (error) {
    console.error('Error fetching Ratings by User ID:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.findRatingComplainByCommerceId = async (req, res) => {
  try {
    const { commerceId } = req.params;
    const ratings = await Rating.findRatingsByCommerceId(commerceId); 
    if (ratings && ratings.length > 0) {
      res.status(200).json(ratings);
    } else {
      res.status(404).json({ message: 'No ratings found for this commerce.' });
    }
  } catch (error) {
    console.error('Error fetching Ratings by Commerce ID:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.findRatingByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;
    const rating = await Rating.findRatingByOrderId(orderId); 
    if (rating) {
      res.status(200).json(rating);
    } else {
      res.status(404).json({ message: 'No rating found for this order.' });
    }
  } catch (error) {
    console.error('Error fetching Rating by Order ID:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};
