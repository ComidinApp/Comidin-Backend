// src/services/emailSender.js
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// ===============================
// CÓDIGO DE VERIFICACIÓN
// ===============================
exports.sendVerificationCode = async (employee, verificationCode) => {
  try {
    const fullname = `${employee.first_name} ${employee.last_name}`;

    const msg = {
      to: employee.email,
      from: 'no-reply@comidin.com.ar',
      templateId: process.env.SENDGRID_VERIFICATION_CODE,
      dynamic_template_data: {
        code: verificationCode,
        employee_name: fullname,
      },
    };

    await sgMail.send(msg);
  } catch (error) {
    console.error('Error al enviar código de verificación:', error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};

// ===============================
// RECEPCIÓN SOLICITUD COMERCIO
// ===============================
exports.sendCommerceWelcome = async (commerce) => {
  try {
    const msg = {
      to: commerce.email,
      from: 'no-reply@comidin.com.ar',
      templateId: process.env.SENDGRID_COMMERCE_WELCOME,
      dynamic_template_data: {
        commerceName: commerce.name, // ✅ NORMALIZADO
      },
    };

    await sgMail.send(msg);
  } catch (error) {
    console.error('Error al enviar mensaje de bienvenida al comercio:', error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};

// ===============================
// BIENVENIDA EMPLEADO
// ===============================
exports.sendEmployeeWelcome = async (employee) => {
  try {
    const fullname = `${employee.first_name} ${employee.last_name}`;

    const msg = {
      to: employee.email,
      from: 'no-reply@comidin.com.ar',
      templateId: process.env.SENDGRID_EMPLOYEE_WELCOME,
      dynamic_template_data: {
        userName: fullname,
      },
    };

    await sgMail.send(msg);
  } catch (error) {
    console.error('Error al enviar mensaje de bienvenida al empleado:', error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};

// ===============================
// COMERCIO APROBADO
// ===============================
exports.sendAdmittedNoticeCommerce = async (adminEmployee) => {
  try {
    const msg = {
      to: adminEmployee.email,
      from: 'no-reply@comidin.com.ar',
      templateId: process.env.SENDGRID_CONFIRMED_COMMERCE,
      dynamic_template_data: {
        commerceName: adminEmployee?.commerce?.name || 'tu comercio',
      },
    };

    await sgMail.send(msg);
  } catch (error) {
    console.error('Error al enviar mensaje de admisión a comercio:', error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};

// ===============================
// COMERCIO RECHAZADO
// ===============================
exports.sendRejectedNoticeCommerce = async (adminEmployee) => {
  try {
    const msg = {
      to: adminEmployee.email,
      from: 'no-reply@comidin.com.ar',
      templateId: process.env.SENDGRID_REJECTED_COMMERCE,
      dynamic_template_data: {
        commerceName: adminEmployee?.commerce?.name || 'tu comercio',
        contactMail: 'contactoar@comidin.com.ar',
      },
    };

    await sgMail.send(msg);
  } catch (error) {
    console.error('Error al enviar mensaje de rechazo al comercio:', error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};
