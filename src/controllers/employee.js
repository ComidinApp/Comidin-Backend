const Employee = require('../models/employee');

exports.createEmployee = async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        res.status(201).json(employee);
    } catch (error) {
        console.error('Error creating Employee:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.findAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAllEmployees();
        res.status(200).json(employees);
    } catch (error) {
        console.error('Error fetching Employees:', error);
        res.status(500).json({ error: 'Internal Server Error' });
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
        res.status(500).json({ error: 'Internal Server Error' });
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
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found with id: ' + id });
        }
        await employee.destroy();
        res.status(200).json(employee);
    } catch (error) {
        console.error('Error deleting Employee:', error);
        res.status(500).json({ error: 'Internal Server Error' });
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
        res.status(500).json({ error: 'Internal Server Error' });
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
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
