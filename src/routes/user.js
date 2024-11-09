const express = require('express');
const { validationResult } = require('express-validator');
const User = require('../controllers/user');
const { createUserValidation, updateUserValidation } = require('../validators/userValidation');
const router = express.Router();

// Middleware para manejar errores de validación
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/', createUserValidation, validate, User.createUser);
router.get('/', User.findAllUsers);
router.get('/:id', User.findUserById);
router.put('/:id', updateUserValidation, validate, User.updateUser);
router.delete('/:id', User.deleteUser);
router.get('/email/:email', User.findUserByEmail);

module.exports = router;