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

// ----------------------------------------------------------------------
// Crear empleado
router.post('/', createEmployeeValidation, validate, EmployeeController.createEmployee);

// Listar empleados
router.get('/', EmployeeController.findAllEmployees);

// Verificar si existe un empleado por email (para el registro de comercio)
// Ej: GET /employee/exists?email=algo@correo.com
router.get('/exists', EmployeeController.checkEmailExists);

// IMPORTANTE: esta ruta va DESPUÉS de /exists para no pisarla
// Obtener empleado por ID
router.get('/:id', employeeIdValidation, validate, EmployeeController.findEmployeeById);

// Actualizar empleado
router.put('/:id', updateEmployeeValidation, validate, EmployeeController.updateEmployee);

// Eliminar empleado
router.delete('/:id', employeeIdValidation, validate, EmployeeController.deleteEmployee);

// Enviar código de verificación (si usás este flujo)
router.post(
  '/send-verification-code',
  EmployeeVerificationController.sendVerificationCodeToEmployee
);

module.exports = router;
