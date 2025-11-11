const express = require('express'); 
const { validationResult, query } = require('express-validator'); // ← agregamos query
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

// --- NUEVO: /employee/exists?email=... ---
router.get(
  '/exists',
  [query('email').isEmail().withMessage('Email inválido')], // valida querystring
  validate,
  Employee.checkEmailExists // función nueva en el controller
);

router.post('/', createEmployeeValidation, validate, Employee.createEmployee);
router.get('/', Employee.findAllEmployees);

// ¡IMPORTANTE! rutas específicas antes de "/:id"
router.get('/commerce/:commerceId', commerceIdValidation, validate, Employee.findEmployeesByCommerceId);
router.get('/role/:roleId', roleIdValidation, validate, Employee.findEmployeesByRoleId);
router.get('/email/:email', Employee.findEmployeeByEmail);

router.get('/:id', Employee.findEmployeeById);
router.put('/:id', updateEmployeeValidation, validate, Employee.updateEmployee);
router.delete('/:id', Employee.deleteEmployee);

module.exports = router;
