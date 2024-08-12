const express = require('express');
const Rating = require('../controllers/rating');
const router = express.Router();

router.post('/', Rating.createRating);
router.get('/', Rating.findAllRatings);
router.get('/:id', Rating.findRatingById);
router.put('/:id', Rating.updateRating);
router.delete('/:id', Rating.deleteRating);
// find raitings by user
// find raitings by commerce
// find raiting by order id

module.exports = router;
