// src/routes/employee.js

const express = require('express');
const { validationResult, param } = require('express-validator');

const EmployeeController = require('../controllers/employee');
const EmployeeVerificationController = require('../controllers/employeeVerification');

const {
  createEmployeeValidation,
  updateEmployeeValidation,
  commerceIdValidation,
  roleIdValidation,
} = require('../validators/employeeValidation');

const router = express.Router();

// Middleware genérico de validación
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors || errors.isEmpty()) return next();
  return res.status(400).json({ errors: errors.array() });
};

/* ===========================================================
 * EMPLOYEES
 * ===========================================================
 */

// Crear empleado
// POST /employee
router.post(
  '/',
  Array.isArray(createEmployeeValidation) ? createEmployeeValidation : [],
  validate,
  (req, res) => EmployeeController.createEmployee(req, res)
);

// Listar todos los empleados
// GET /employee
router.get('/', (req, res) => EmployeeController.findAllEmployees(req, res));

// Verificar si existe un empleado por email
// GET /employee/exists?email=algo@correo.com
router.get('/exists', (req, res) => EmployeeController.checkEmployeeExists(req, res));

// Obtener empleado por email
// GET /employee/email/:email
router.get('/email/:email', (req, res) => EmployeeController.findEmployeeByEmail(req, res));

// Obtener empleados por ID de comercio
// GET /employee/commerce/:commerceId
router.get(
  '/commerce/:commerceId',
  Array.isArray(commerceIdValidation) ? commerceIdValidation : [],
  validate,
  (req, res) => EmployeeController.findEmployeesByCommerceId(req, res)
);

// Obtener empleados por ID de rol (opcional, pero ya tenés el controlador listo)
// GET /employee/role/:roleId
router.get(
  '/role/:roleId',
  Array.isArray(roleIdValidation) ? roleIdValidation : [],
  validate,
  (req, res) => EmployeeController.findEmployeesByRoleId(req, res)
);

// Obtener empleado por ID
// GET /employee/:id
router.get(
  '/:id',
  [
    param('id')
      .isInt({ min: 1 })
      .withMessage('Employee ID must be a positive integer'),
  ],
  validate,
  (req, res) => EmployeeController.findEmployeeById(req, res)
);

// Actualizar empleado por ID
// PUT /employee/:id
router.put(
  '/:id',
  [
    param('id')
      .isInt({ min: 1 })
      .withMessage('Employee ID must be a positive integer'),
    ...(Array.isArray(updateEmployeeValidation) ? updateEmployeeValidation : []),
  ],
  validate,
  (req, res) => EmployeeController.updateEmployee(req, res)
);

// Eliminar empleado por ID
// DELETE /employee/:id
router.delete(
  '/:id',
  [
    param('id')
      .isInt({ min: 1 })
      .withMessage('Employee ID must be a positive integer'),
  ],
  validate,
  (req, res) => EmployeeController.deleteEmployee(req, res)
);

/* ===========================================================
 * VERIFICACIÓN (CÓDIGO POR MAIL)
 * ===========================================================
 */

// Enviar código de verificación a un empleado
// POST /employee/send-verification-code
router.post(
  '/send-verification-code',
  (req, res, next) =>
    EmployeeVerificationController.sendVerificationCodeToEmployee(req, res, next)
);

module.exports = router;
