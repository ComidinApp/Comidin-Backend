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