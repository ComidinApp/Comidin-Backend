const express = require('express');
const { validationResult } = require('express-validator');
const Role = require('../controllers/role');
const {
  createRoleValidation,
  updateRoleValidation,
} = require('../validators/roleValidation');
const router = express.Router();
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
router.post('/', createRoleValidation, validate, Role.createRole);
router.get('/', Role.findAllRoles);
router.get('/:id', Role.findRoleById);
router.put('/:id', updateRoleValidation, validate, Role.updateRole);
router.delete('/:id', Role.deleteRole);
module.exports = router;
