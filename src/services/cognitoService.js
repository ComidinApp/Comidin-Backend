const { CognitoIdentityProviderClient, AdminCreateUserCommand } = require("@aws-sdk/client-cognito-identity-provider");
const client = new CognitoIdentityProviderClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

exports.createNewEmployee = async (employee) => {
    try {
        const params = {
            UserPoolId: process.env.COGNITO_USER_POOL_ID,
            Username: generateUniqueUsername(employee.email),
            UserAttributes: [
                {
                    Name: "email",
                    Value: employee.email
                },
                {
                    Name: "name",
                    Value: employee.first_name
                },
                {
                    Name: "email_verified",
                    Value: "true"
                }
            ],
            TemporaryPassword: employee.password,
            MessageAction: "SUPPRESS", 
        };

        const command = new AdminCreateUserCommand(params);
        const response = await client.send(command);

        console.log("Empleado creado exitosamente:", response);
        return response;
    } catch (error) {
        console.error("Error al crear el empleado:", error);
        throw new Error(error);
    }
};

function generateUniqueUsername(email) {
    const timestamp = Date.now().toString();
    const username = `${email}_${timestamp}`;
    return username;
  }
  
