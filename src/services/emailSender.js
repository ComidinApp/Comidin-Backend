const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendVerificationCode = async (email,verificationCode) => {
    try {
        const msg = {
            to: email, 
            from: 'no-reply@comidin.com.ar',
            templateId: 'YOUR_TEMPLATE_ID',
            dynamic_template_data: {
                verification_code: verificationCode,
            },
        };

        await sgMail.send(msg);
    } catch (error) {
      console.error('Error deleting Product:', error);
    }
  };