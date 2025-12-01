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

// Bulk: varios productos de la misma orden
router.post('/bulk', Rating.createBulkRatings);

// Crear rating individual
router.post('/', createRatingValidation, validate, Rating.createRating);

// Listar todos
router.get('/', Rating.findAllRatings);

// Específicos (antes de /:id)
router.get('/user/:userId', userIdValidation, validate, Rating.findRatingByUserId);
router.get(
  '/commerce/:commerceId',
  commerceIdValidation,
  validate,
  Rating.findRatingComplainByCommerceId
);
router.get('/order/:orderId', orderIdValidation, validate, Rating.findRatingByOrderId);

// Por id
router.get('/:id', Rating.findRatingById);
router.put('/:id', updateRatingValidation, validate, Rating.updateRating);
router.delete('/:id', Rating.deleteRating);

module.exports = router;
