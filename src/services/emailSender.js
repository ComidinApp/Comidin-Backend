const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendVerificationCode = async (employee,verificationCode) => {
    try {
        const fullname = employee.first_name + ' ' + employee.last_name
        const msg = {
            to: employee.email, 
            from: 'no-reply@comidin.com.ar',
            templateId: process.env.SENDGRID_VERIFICATION_CODE,
            dynamic_template_data: {
                code: verificationCode,
                employee_name: fullname
            },
        };

        await sgMail.send(msg);
    } catch (error) {
      console.error('Error deleting Product:', error);
    }
  };

  exports.sendCommerceWelcome = async (commerce) => {
    try {
        const msg = {
            to: commerce.email, 
            from: 'no-reply@comidin.com.ar',
            templateId: process.env.SENDGRID_COMMERCE_WELCOME,
            dynamic_template_data: {
                commercename: commerce.name
            },
        };

        await sgMail.send(msg);
    } catch (error) {
      console.error('Error deleting Product:', error);
    }
  };


  exports.sendEmployeeWelcome = async (employee) => {
    try {
      const fullname = employee.first_name + ' ' + employee.last_name
        const msg = {
            to: employee.email, 
            from: 'no-reply@comidin.com.ar',
            templateId: process.env.SENDGRID_EMPLOYEE_WELCOME,
            dynamic_template_data: {
                userName: fullname
            },
        };

        await sgMail.send(msg);
    } catch (error) {
      console.error('Error deleting Product:', error);
    }
  };