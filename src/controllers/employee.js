// src/controllers/employee.js
const { Op } = require('sequelize');
const Employee = require('../models/employee');
const Commerce = require('../models/commerce');

const { createNewEmployee } = require('../services/cognitoService');
const { sendEmployeeWelcome, sendCommerceWelcome } = require('../services/emailSender');

// ===========================================================================
// CREAR EMPLEADO  (BD + COGNITO + MAIL)
// ===========================================================================
// Reglas de negocio:
// - role_id === 6 (admin/propietario):
//   - Cognito con password permanente
//   - Enviar sendCommerceWelcome al mail del empleado (recipient real)
// - role_id !== 6:
//   - Cognito normal
//   - Enviar sendEmployeeWelcome con password provisoria
// ===========================================================================
exports.createEmployee = async (req, res) => {
  try {
    const data = req.body;

    // Validación mínima para que no se cree cualquier cosa
    if (!data?.email) {
      return res.status(400).json({ error: 'Bad Request', message: 'email es requerido' });
    }
    if (!data?.password) {
      return res.status(400).json({ error: 'Bad Request', message: 'password provisoria es requerida' });
    }    

    // 1) Crear empleado en BD
    data.status = 'active';
    const newEmployee = await Employee.create(data);
    const roleId = Number(newEmployee.role_id ?? data.role_id);

    // 2) Crear usuario en Cognito
    try {
      await createNewEmployee(
        {
          email: newEmployee.email,
          first_name: newEmployee.first_name,
          last_name: newEmployee.last_name,
          password: data.password, // viene del request
        },
        {
          makePermanent: roleId === 6, // Propietario: password permanente
        }
      );

      // 3) Enviar mails según rol
      if (roleId === 6) {
        // ✅ Admin/propietario: mail “welcome commerce” al email del empleado
        // Necesitamos commerceName, así que traemos el comercio por commerce_id
        const commerceId = newEmployee.commerce_id;

        if (!commerceId) {
          console.warn('Owner employee created but missing commerce_id. Skipping sendCommerceWelcome.', {
            employeeId: newEmployee.id,
            email: newEmployee.email,
          });
        } else {
          const commerce = await Commerce.findByPk(commerceId);

          // Si no existe por algún motivo raro, igual no rompemos el flujo
          if (!commerce) {
            console.warn('Commerce not found for owner employee. Skipping sendCommerceWelcome.', {
              commerceId,
              employeeId: newEmployee.id,
            });
          } else {
            await sendCommerceWelcome({
              commerce,
              toEmail: newEmployee.email,
            });
          }
        }

        // 🔕 NO enviamos sendEmployeeWelcome para role 6 (mantengo tu regla original)
        // Si en algún momento querés mandar ambos, lo agregás acá.
      } else {
        // 4) No propietario: enviar email al empleado con contraseña provisoria
        await sendEmployeeWelcome(newEmployee, data.password);
      }
    } catch (cognitoOrEmailError) {
      console.error('Error creando empleado en Cognito o enviando mail:', cognitoOrEmailError);

      // Si querés consistencia estricta, podrías revertir BD si Cognito falla:
      // await newEmployee.destroy();
      // return res.status(500).json({ error: 'Error al crear usuario en Cognito', message: cognitoOrEmailError.message });

      // Por ahora: no rompemos la creación del empleado en BD
    }

    return res.status(201).json({
      message: 'Empleado creado con éxito',
      employee: newEmployee,
    });
  } catch (error) {
    console.error('Error creating employee:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      message: error.message,
    });
  }
};

// ===========================================================================
// LISTAR TODOS LOS EMPLEADOS
// ===========================================================================
exports.findAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAllEmployees();
    return res.json(employees);
  } catch (error) {
    console.error('Error finding employees:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      message: error.message,
    });
  }
};

// ===========================================================================
// BUSCAR EMPLEADO POR ID
// ===========================================================================
exports.findEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findEmployeeById(id);

    if (!employee) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

    return res.json(employee);
  } catch (error) {
    console.error('Error finding employee by ID:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      message: error.message,
    });
  }
};

// ===========================================================================
// BUSCAR EMPLEADO POR EMAIL
// ===========================================================================
exports.findEmployeeByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ error: 'El email es requerido' });
    }

    const employee = await Employee.findEmployeeByEmail(email);

    if (!employee) {
      return res
        .status(404)
        .json({ error: `No se encontró un empleado con el email: ${email}` });
    }

    return res.status(200).json(employee);
  } catch (error) {
    console.error('Error finding employee by email:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      message: error.message,
    });
  }
};

// ===========================================================================
// BUSCAR EMPLEADOS POR ID DE COMERCIO
// ===========================================================================
exports.findEmployeesByCommerceId = async (req, res) => {
  try {
    const { commerceId } = req.params;
    const employees = await Employee.findEmployeesByCommerceId(commerceId);

    return res.json(employees);
  } catch (error) {
    console.error('Error finding employees by commerce ID:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      message: error.message,
    });
  }
};

// ===========================================================================
// BUSCAR EMPLEADOS POR ID DE ROL
// ===========================================================================
exports.findEmployeesByRoleId = async (req, res) => {
  try {
    const { roleId } = req.params;
    const employees = await Employee.findEmployeesByRoleId(roleId);

    return res.json(employees);
  } catch (error) {
    console.error('Error finding employees by role ID:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      message: error.message,
    });
  }
};

// ===========================================================================
// ACTUALIZAR EMPLEADO
// ===========================================================================
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const [updated] = await Employee.update(req.body, { where: { id } });

    if (!updated) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

    const updatedEmployee = await Employee.findByPk(id);

    return res.json({
      message: 'Empleado actualizado con éxito',
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error('Error updating employee:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      message: error.message,
    });
  }
};

// ===========================================================================
// ELIMINAR EMPLEADO
// ===========================================================================
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findOne({ where: { id } });

    if (!employee) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

    await employee.update({ is_deleted: true });

    return res.json({ message: 'Empleado eliminado con éxito' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      message: error.message,
    });
  }
};

// ===========================================================================
// VALIDACIÓN DE EMAIL / TEL / DNI (UNIQUE EN TIEMPO REAL)
// ===========================================================================
exports.checkEmployeeExists = async (req, res) => {
  try {
    const { email, phone_number, national_id, excludeId } = req.query;

    if (!email && !phone_number && !national_id) {
      return res.status(400).json({
        error: 'Debe enviar email, phone_number o national_id para validar duplicados.',
      });
    }

    const where = {};
    if (excludeId) where.id = { [Op.ne]: Number(excludeId) };

    const orConditions = [];
    if (email) orConditions.push({ email });
    if (phone_number) orConditions.push({ phone_number });
    if (national_id) orConditions.push({ national_id });

    const employees = await Employee.findAll({
      where: {
        ...where,
        [Op.or]: orConditions,
      },
    });

    return res.json({
      emailExists: employees.some((e) => e.email === email),
      phoneExists: employees.some((e) => e.phone_number === phone_number),
      nationalIdExists: employees.some((e) => e.national_id === national_id),
    });
  } catch (error) {
    console.error('Error checking employee unique fields:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
