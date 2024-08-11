const express = require('express');
const User = require('../controllers/user');
const router = express.Router();

router.post('/', User.createUser);
router.get('/', User.findAllUsers);
router.get('/:id', User.findUserById);
router.put('/:id', User.updateUser);
router.delete('/:id', User.deleteUser);

module.exports = router;
