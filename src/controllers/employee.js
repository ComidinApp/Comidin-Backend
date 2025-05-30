const Employee = require('../models/employee');
const { createNewEmployee, deleteEmployeeAccount } = require('../services/cognitoService')
const { sendEmployeeWelcome } = require('../services/emailSender');

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

exports.changeEmployeePassword = async (req, res) => {
    try {
        const { email, newPassword, code } = req.body;

        // Validación de parámetros (corregido el uso de los signos de admiración)
        if (!email || !newPassword || !code) {
            return res.status(400).json({ message: 'Faltan parámetros requeridos.' });
        }

        const employee = await Employee.findEmployeeByEmail(email);
        if (!employee) {
            return res.status(404).json({ message: 'No se encontró ningún empleado con ese email.' });
        }

        // Corregida interpolación del filtro
        const listParams = {
            UserPoolId: process.env.COGNITO_EMPLOYEE_POOL_ID,
            Filter: `email = "${email}"`,
        };

        const listUsersCommand = new ListUsersCommand(listParams);
        const user = await client.send(listUsersCommand);

        // Corregida condición
        if (!user.Users || user.Users.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado en Cognito.' });
        }

        const cognitoUsername = user.Users[0].Username;

        if (String(employee.verification_code) === String(code)) {
            const params = {
                UserPoolId: process.env.COGNITO_EMPLOYEE_POOL_ID,
                Username: cognitoUsername,
                Password: newPassword,
                Permanent: true,
            };

            const command = new AdminSetUserPasswordCommand(params);
            await client.send(command);

            employee.verification_code = null;
            await employee.save();

            res.status(200).json({ message: 'Contraseña cambiada correctamente.' });
        } else {
            res.status(409).json({ error: 'Código no válido.' });
        }

    } catch (error) {
        console.error('Error al cambiar contraseña:', error);
        res.status(409).json({ error: 'Conflict', message: error.message });
    }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found with id: ' + id });
    }

    await employee.update(req.body);
    res.status(200).json(employee);
  } catch (error) {
    console.error('Error updating Employee:', error);
    res.status(409).json({ error: 'Conflict', message: error.message });
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
