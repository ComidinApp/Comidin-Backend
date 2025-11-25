// src/controllers/employeeVerification.js
const Employee = require('../models/employee');
const { sendVerificationCode } = require('../services/emailSender');

exports.sendVerificationCodeToEmployee = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // 1. Buscar empleado por email
    const employee = await Employee.findOne({ where: { email } });

    if (!employee) {
      return res.status(404).json({ error: `Employee not found with email: ${email}` });
    }

    // 2. Reusar código existente o generar uno nuevo
    let code = employee.verification_code;

    if (!code) {
      code = Math.floor(100000 + Math.random() * 900000).toString();

      await employee.update({
        verification_code: code,
      });
    }

    // 3. Enviar email con SendGrid
    await sendVerificationCode(employee, code);

    return res.status(200).json({ message: 'Verification code sent' });
  } catch (error) {
    console.error('Error sending verification code to employee:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
