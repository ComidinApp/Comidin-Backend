// src/routes/employee.js
const express = require('express');
const { validationResult } = require('express-validator');
const EmployeeController = require('../controllers/employee');
const EmployeeVerificationController = require('../controllers/employeeVerification');
const {
  createEmployeeValidation,
  updateEmployeeValidation,
  employeeIdValidation,
} = require('../validators/employeeValidation');

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Crear empleado
router.post('/', createEmployeeValidation, validate, EmployeeController.createEmployee);

// Listar empleados
router.get('/', EmployeeController.findAllEmployees);

// Obtener empleado por ID
router.get('/:id', employeeIdValidation, validate, EmployeeController.findEmployeeById);

// Actualizar empleado
router.put('/:id', updateEmployeeValidation, validate, EmployeeController.updateEmployee);

// Eliminar empleado
router.delete('/:id', employeeIdValidation, validate, EmployeeController.deleteEmployee);


router.post(
  '/send-verification-code',
  EmployeeVerificationController.sendVerificationCodeToEmployee
);

module.exports = router;
