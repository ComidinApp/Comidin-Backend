const Employee = require('../models/employee');
const { createNewEmployee, deleteEmployeeAccount } = require('../services/cognitoService')
const { sendEmployeeWelcome } = require('../services/emailSender');
const db = require('../models');            
const EmployeeModel = db.employee || db.Employee; 

// ...resto de tus handlers

exports.checkEmailExists = async (req, res) => {
  try {
    const { email } = req.query;
    // defensa extra (aunque ya valida el router)
    if (!email) return res.status(400).json({ error: 'Email es requerido' });

    const found = await EmployeeModel.findOne({ where: { email } });
    return res.json({ exists: !!found });
  } catch (error) {
    console.error('Error checking employee email:', error);
    return res.status(500).json({ error: 'Error verificando el email' });
  }
};
exports.createEmployee = async (req, res) => {
    try {
        await createNewEmployee(req.body)
        const employee = await Employee.create(req.body);
        await sendEmployeeWelcome(employee)
        res.status(201).json(employee);
    } catch (error) {
        console.error('Error creating Employee:', error);
        res.status(409).json({ error: 'Conflict', meesage: error });
    }
};

exports.findAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAllEmployees();
        res.status(200).json(employees);
    } catch (error) {
        console.error('Error fetching Employees:', error);
        res.status(409).json({ error: 'Conflict', meesage: error });
    }
};

exports.findEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findEmployeeById(id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found with id: ' + id });
        }
        res.status(200).json(employee);
    } catch (error) {
        console.error('Error fetching Employee by ID:', error);
        res.status(409).json({ error: 'Conflict', meesage: error });
    }
};

exports.findEmployeeByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const employee = await Employee.findEmployeeByEmail(email);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found with email: ' + email });
        }
        res.status(200).json(employee);
    } catch (error) {
        console.error('Error fetching Employee by email:', error);
        res.status(409).json({ error: 'Conflict', meesage: error });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found with id: ' + id });
        }
        await employee.update(body);
        res.status(200).json(employee);
    } catch (error) {
        console.error('Error updating Employee:', error);
        res.status(409).json({ error: 'Conflict', meesage: error });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found with id: ' + id });
        }
        const employee_email = employee.email
        await employee.destroy();
        await deleteEmployeeAccount(employee_email)
        res.status(200).json({ message: 'Employee successfully deleted' }); 
    } catch (error) {
        console.error('Error deleting Employee:', error);
        res.status(409).json({ error: 'Conflict', meesage: error });
    }
};

exports.findEmployeesByCommerceId = async (req, res) => {
    try {
        const { commerceId } = req.params;
        const employees = await Employee.findEmployeesByCommerceId(commerceId);
        if (!employees) {
            return res.status(404).json({ message: 'No employees found for this commerce.' });
        }
        res.status(200).json(employees);
    } catch (error) {
        console.error('Error fetching Employees by Commerce ID:', error);
        res.status(409).json({ error: 'Conflict', meesage: error });
    }
};

exports.findEmployeesByRoleId = async (req, res) => {
    try {
        const { roleId } = req.params;
        const employees = await Employee.findEmployeesByRoleId(roleId);
        if (!employees) {
            return res.status(404).json({ message: 'No employees found for this role.' });
        }
        res.status(200).json(employees);
    } catch (error) {
        console.error('Error fetching Employees by Role ID:', error);
        res.status(409).json({ error: 'Conflict', meesage: error });
    }
};
