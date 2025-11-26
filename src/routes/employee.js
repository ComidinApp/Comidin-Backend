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

// Middleware no-op por si alguna validación viene undefined
const noop = (req, _res, next) => next();

// Aceptamos tanto funciones como arrays de middlewares (lo típico de express-validator)
const safeCreateEmployeeValidation =
  Array.isArray(createEmployeeValidation) || typeof createEmployeeValidation === 'function'
    ? createEmployeeValidation
    : noop;

const safeUpdateEmployeeValidation =
  Array.isArray(updateEmployeeValidation) || typeof updateEmployeeValidation === 'function'
    ? updateEmployeeValidation
    : noop;

const safeEmployeeIdValidation =
  Array.isArray(employeeIdValidation) || typeof employeeIdValidation === 'function'
    ? employeeIdValidation
    : noop;

// ----------------------------------------------------------------------
// Crear empleado
router.post(
  '/',
  safeCreateEmployeeValidation,
  validate,
  (req, res) => EmployeeController.createEmployee(req, res)
);

// Listar empleados
router.get('/', (req, res) => EmployeeController.findAllEmployees(req, res));

// Verificar si existe un empleado por email (para el registro de comercio)
// Ej: GET /employee/exists?email=algo@correo.com
router.get('/exists', (req, res) => EmployeeController.checkEmailExists(req, res));

// Obtener empleado por email (ruta vieja que usan pantallas actuales)
// Ej: GET /employee/email/jpdona@hotmail.com
router.get('/email/:email', (req, res) => EmployeeController.findEmployeeByEmail(req, res));

// Obtener empleado por ID
router.get(
  '/:id',
  safeEmployeeIdValidation,
  validate,
  (req, res) => EmployeeController.findEmployeeById(req, res)
);

// Actualizar empleado
router.put(
  '/:id',
  safeUpdateEmployeeValidation,
  validate,
  (req, res) => EmployeeController.updateEmployee(req, res)
);

// Eliminar empleado
router.delete(
  '/:id',
  safeEmployeeIdValidation,
  validate,
  (req, res) => EmployeeController.deleteEmployee(req, res)
);

// Enviar código de verificación (si usás este flujo)
router.post(
  '/send-verification-code',
  (req, res, next) =>
    EmployeeVerificationController.sendVerificationCodeToEmployee(req, res, next)
);

module.exports = router;
