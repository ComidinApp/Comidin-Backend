
const Employee = require('../models/employee');

const createEmployee = async (req, res) => {
    try {
        const { body } = req;
        const employee = new Employee(body);
        await employee.save();
        return res.status(201).json(employee);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

const findAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll()
        return res.status(200).json(employees);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const findEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found with id:' + id });
        }
        return res.status(200).json(employee);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const updateEmployee = async (req, res) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found with id:' + id });
        }
        await employee.update(body);
        return res.status(201).json(employee);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found with id:' + id });
        }
        await employee.destroy()
        return res.status(200).json(employee);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

module.exports =  {createEmployee, updateEmployee, deleteEmployee, findAllEmployees, findEmployeeById};