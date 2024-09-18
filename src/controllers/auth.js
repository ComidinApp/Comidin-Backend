const Employee = require('../models/employee');
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

        //Send mail
        res.status(200).json();
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.changeEmployeePassword = async (req, res) => {
    try {
        const { email, newPassword, code } = req.body;
        const employee = await Employee.findEmployeeByEmail(email);
        if (!employee) {
            return res.status(404).json({ message: 'No employees found for this email.' });
        }

        const listParams = {
            UserPoolId: process.env.COGNITO_USER_POOL_ID,
            Filter: `email = "${email}"`
        };

        const listUsersCommand = new ListUsersCommand(listParams);
        const user = await client.send(listUsersCommand);

        if (user.Users.length === 0) {
            return res.status(404).json({ message: 'User not found in Cognito' });
        }

        const cognitoUsername = user.Users[0].Username;

        if (employee.verification_code == code) {
            const params = {
                UserPoolId: process.env.COGNITO_USER_POOL_ID,
                Username: cognitoUsername,
                Password: newPassword,
                Permanent: true
            };

            const command = new AdminSetUserPasswordCommand(params);
            await client.send(command);

            employee.password = newPassword;
            employee.verification_code = null;
            await employee.save();
            res.status(200).json();
        } else {
            res.status(409).json({ error: 'Codigo no valido' });
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
