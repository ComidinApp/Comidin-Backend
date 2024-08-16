const express = require('express');
const Employee = require('../controllers/employee');
const router = express.Router();

router.post('/', Employee.createEmployee);
router.get('/', Employee.findAllEmployees);
router.get('/:id', Employee.findEmployeeById);
router.put('/:id', Employee.updateEmployee);
router.delete('/:id', Employee.deleteEmployee);
router.get('/commerce/:commerceId', Employee.findEmployeesByCommerceId);
router.get('/role/:roleId', Employee.findEmployeesByRoleId);

module.exports = router;
