// controllers/employee.js
const { Op } = require('sequelize');
const Employee = require('../models/employee');

exports.checkEmployeeExists = async (req, res) => {
  try {
    const { email, phone_number, national_id, excludeId } = req.query;

    if (!email && !phone_number && !national_id) {
      return res.status(400).json({
        error: 'Debe enviar al menos un email, phone_number o national_id para validar.',
      });
    }

    const whereBase = {};
    if (excludeId) {
      whereBase.id = { [Op.ne]: Number(excludeId) };
    }

    const orConditions = [];
    if (email) orConditions.push({ email });
    if (phone_number) orConditions.push({ phone_number });
    if (national_id) orConditions.push({ national_id });

    const employees = await Employee.findAll({
      where: {
        ...whereBase,
        [Op.or]: orConditions,
      },
    });

    const emailExists = !!(email && employees.some((e) => e.email === email));
    const phoneExists = !!(phone_number && employees.some((e) => e.phone_number === phone_number));
    const nationalIdExists = !!(
      national_id && employees.some((e) => e.national_id === national_id)
    );

    return res.json({
      emailExists,
      phoneExists,
      nationalIdExists,
    });
  } catch (error) {
    console.error('Error checking employee unique fields:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
