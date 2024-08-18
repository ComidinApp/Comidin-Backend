const express = require('express');
const Rating = require('../controllers/rating');
const router = express.Router();

router.post('/', Rating.createRating);
router.get('/', Rating.findAllRatings);
router.get('/:id', Rating.findRatingById);
router.put('/:id', Rating.updateRating);
router.delete('/:id', Rating.deleteRating);
router.get('/user/:userId', Rating.findRatingByUserId);
router.get('/commerce/:commerceId', Rating.findRatingComplainByCommerceId);
router.get('/order/:orderId', Rating.findRatingByOrderId);
 
module.exports = router;
