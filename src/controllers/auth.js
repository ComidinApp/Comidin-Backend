const Employee = require('../models/employee');
const { sendVerificationCode } = require('../services/emailSender');
const { CognitoIdentityProviderClient, AdminSetUserPasswordCommand, ListUsersCommand } = require("@aws-sdk/client-cognito-identity-provider");
const client = new CognitoIdentityProviderClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

exports.sendEmployeeVerificationCode = async (req, res) => {
    try {
        const { email } = req.body;
        const employee = await Employee.findEmployeeByEmail(email);
        if (!employee) {
            return res.status(404).json({ message: 'No employees found for this email.' });
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        employee.verification_code = verificationCode;
        await employee.save();

        sendVerificationCode(employee,verificationCode)
        res.status(200).json();
    } catch (error) {
        console.log(error)
        res.status(409).json({ error: 'Conflict', meesage: error });
    }
};

exports.changeEmployeePassword = async (req, res) => {
    try {
        const { email, newPassword, code } = req.body;
        if (!email || !newPassword || !code) {
            return res.status(400).json({ message: 'Faltan parámetros requeridos.' });
        }

        const employee = await Employee.findEmployeeByEmail(email);
        if (!employee) {
            return res.status(404).json({ message: 'No employees found for this email.' });
        }

        const listParams = {
            UserPoolId: process.env.COGNITO_EMPLOYEE_POOL_ID,
            Filter: `email = "${email}"`
        };

        const listUsersCommand = new ListUsersCommand(listParams);
        const user = await client.send(listUsersCommand);

        if (!user.Users || user.Users.length === 0) {
            return res.status(404).json({ message: 'User not found in Cognito' });
        }

        const cognitoUsername = user.Users[0].Username;

        if (String(employee.verification_code) === String(code)) {
            const params = {
                UserPoolId: process.env.COGNITO_EMPLOYEE_POOL_ID,
                Username: cognitoUsername,
                Password: newPassword,
                Permanent: true
            };

            const command = new AdminSetUserPasswordCommand(params);
            await client.send(command);

            employee.verification_code = null;
            await employee.save();
            res.status(200).json({ message: 'Contraseña cambiada correctamente.' });
        } else {
            res.status(409).json({ error: 'Codigo no valido' });
        }
        
    } catch (error) {
        console.log(error)
        res.status(409).json({ error: 'Conflict', message: error.message || error });
    }
};