const express = require('express');
const { validationResult } = require('express-validator');
const Rating = require('../controllers/rating');
const {
  createRatingValidation,
  updateRatingValidation,
  userIdValidation,
  commerceIdValidation,
  orderIdValidation,
} = require('../validators/ratingValidation');

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/', createRatingValidation, validate, Rating.createRating);

router.get('/', Rating.findAllRatings);

router.get('/user/:userId', userIdValidation, validate, Rating.findRatingByUserId);

router.get('/commerce/:commerceId', commerceIdValidation, validate, Rating.findRatingComplainByCommerceId);

router.get('/order/:orderId', orderIdValidation, validate, Rating.findRatingByOrderId);

router.get('/:id', Rating.findRatingById);

router.put('/:id', updateRatingValidation, validate, Rating.updateRating);

router.delete('/:id', Rating.deleteRating);

module.exports = router;
