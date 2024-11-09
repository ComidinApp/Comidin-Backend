const { CognitoIdentityProviderClient, AdminCreateUserCommand, AdminDeleteUserCommand, ListUsersCommand } = require("@aws-sdk/client-cognito-identity-provider");
const client = new CognitoIdentityProviderClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});
const employeePoolId = process.env.COGNITO_EMPLOYEE_POOL_ID;
const userPoolId = process.env.COGNITO_USER_POOL_ID;

exports.createNewEmployee = async (employee) => {
    try {
        const params = {
            UserPoolId: employeePoolId,
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

async function getCognitoEmployeeByEmail(emailToSearch) {
    try {
      const command = new ListUsersCommand({
        UserPoolId: employeePoolId,
        AttributesToGet: ['sub'],
        Filter: `email = "${emailToSearch}"`
      });
  
      const response = await client.send(command);
      console.log(response);
      
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred trying to get the user');
    }
  }

exports.deleteEmployeeAccount = async (email) => {
  try {
    const userToDelete = await getCognitoEmployeeByEmail(email);
    const username = userToDelete.Users[0].Username;

    const command = new AdminDeleteUserCommand({
      UserPoolId: employeePoolId,
      Username: username
    });

    await client.send(command);
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred trying to delete the user');
  }
}

function generateUniqueUsername(email) {
    const timestamp = Date.now().toString();
    const username = `${email}_${timestamp}`;
    return username;
  }

async function getCognitoUserByEmail(emailToSearch) {
    try {
      const command = new ListUsersCommand({
        UserPoolId: userPoolId,
        AttributesToGet: ['sub'],
        Filter: `email = "${emailToSearch}"`
      });
  
      const response = await client.send(command);
      console.log(response);
      
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred trying to get the user');
    }
  }

exports.deleteUserAccount = async (email) => {
  try {
    const userToDelete = await getCognitoUserByEmail(email);
    const username = userToDelete.Users[0].Username;

    const command = new AdminDeleteUserCommand({
      UserPoolId: userPoolId,
      Username: username
    });

    await client.send(command);
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred trying to delete the user');
  }
}