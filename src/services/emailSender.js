const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

exports.sendCommerceWelcome = async (commerce) => {
  try {
    const msg = {
      to: commerce.email,
      from: 'no-reply@comidin.com.ar',
      templateId: process.env.SENDGRID_COMMERCE_WELCOME,
      dynamic_template_data: {
        commerceName: commerce.name,
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

exports.sendCustomerComplainCommerceToEmployees = async ({ order, user, commerce, employees, complain }) => {
  try {
    const templateId =
      process.env.SENDGRID_ORDER_COMPLAIN_COMMERCE ||
      process.env.SENDGRID_CUSTOMER_COMPLAIN_COMMERCE;

    if (!templateId) {
      throw new Error(
        'Missing env var: SENDGRID_ORDER_COMPLAIN_COMMERCE or SENDGRID_CUSTOMER_COMPLAIN_COMMERCE'
      );
    }

    const recipients = (employees || [])
      .map(e => (e?.email || '').trim())
      .filter(email => email && email.includes('@'));

    const uniqueRecipients = [...new Set(recipients)];

    if (uniqueRecipients.length === 0) {
      return;
    }

    for (const to of uniqueRecipients) {
      const msg = {
        to,
        from: 'no-reply@comidin.com.ar',
        templateId,
        dynamic_template_data: {
          commerceName: commerce?.name || 'tu comercio',
          orderId: order?.id,
          complainDescription: complain?.complain_description || 'Sin descripción',
          customerName: `${user?.first_name || ''} ${user?.last_name || ''}`.trim(),
          customerEmail: user?.email || '',
        },
      };

      await sgMail.send(msg);
    }
  } catch (error) {
    console.error('Error al enviar reclamo a empleados del comercio:', error);
    if (error.response) {
      console.error(error.response.body);
    }
    throw error;
  }
};

exports.sendCustomerComplainCustomer = async ({ order, user, commerce, complain }) => {
  try {
    const templateId =
      process.env.SENDGRID_ORDER_COMPLAIN_CUSTOMER ||
      process.env.SENDGRID_CUSTOMER_COMPLAIN_CUSTOMER;

    if (!templateId) {
      throw new Error(
        'Missing env var: SENDGRID_ORDER_COMPLAIN_CUSTOMER or SENDGRID_CUSTOMER_COMPLAIN_CUSTOMER'
      );
    }

    const to = (user?.email || '').trim();
    if (!to || !to.includes('@')) return;

    const msg = {
      to,
      from: 'no-reply@comidin.com.ar',
      templateId,
      dynamic_template_data: {
        customerName: `${user?.first_name || ''} ${user?.last_name || ''}`.trim(),
        commerceName: commerce?.name || 'el comercio',
        orderId: order?.id,
        complainDescription: complain?.complain_description || 'Sin descripción',
      },
    };

    await sgMail.send(msg);
  } catch (error) {
    console.error('Error al enviar reclamo al cliente:', error);
    if (error.response) console.error(error.response.body);
    throw error;
  }
};

