const express = require('express');
const { validationResult } = require('express-validator');
const Employee = require('../controllers/employee');
const {
  createEmployeeValidation,
  updateEmployeeValidation,
  commerceIdValidation,
  roleIdValidation,
} = require('../validators/employeeValidation');
const router = express.Router();
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/', createEmployeeValidation, validate, Employee.createEmployee);
router.get('/', Employee.findAllEmployees);
router.get('/:id', Employee.findEmployeeById);
router.put('/:id', updateEmployeeValidation, validate, Employee.updateEmployee);
router.delete('/:id', Employee.deleteEmployee);
router.get('/commerce/:commerceId', commerceIdValidation, validate, Employee.findEmployeesByCommerceId);
router.get('/role/:roleId', roleIdValidation, validate, Employee.findEmployeesByRoleId);

module.exports = router;
