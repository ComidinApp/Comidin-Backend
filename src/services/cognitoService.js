const {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
  AdminDeleteUserCommand,
  AdminSetUserPasswordCommand,
  ListUsersCommand,
  AdminGetUserCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

// Client 
const client = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION,
  credentials: process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
    ? {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      }
    : undefined,
});

const employeePoolId = process.env.COGNITO_EMPLOYEE_POOL_ID;
const userPoolId = process.env.COGNITO_USER_POOL_ID;


exports.createNewEmployee = async (employee, options = {}) => {
  let response;

  try {
    if (!employeePoolId) throw new Error("Missing env: COGNITO_EMPLOYEE_POOL_ID");
    if (!process.env.AWS_REGION) throw new Error("Missing env: AWS_REGION");
    if (!employee?.email) throw new Error("Employee email is required");
    if (!employee?.password) throw new Error("Employee password is required");

    const makePermanent = Boolean(options.makePermanent ?? employee.makePermanent);
    const useUniqueUsername = Boolean(options.useUniqueUsername); // default false
    const username = useUniqueUsername
      ? generateUniqueUsername(employee.email)
      : employee.email;

    if (options.returnIfExists) {
      const existing = await findUserByEmail(employeePoolId, employee.email);
      if (existing) {
        return {
          alreadyExists: true,
          user: existing,
        };
      }
    }

    const params = {
      UserPoolId: employeePoolId,
      Username: username,
      UserAttributes: [
        { Name: "email", Value: employee.email },
        { Name: "name", Value: `${employee.first_name || ""} ${employee.last_name || ""}`.trim() },
        { Name: "email_verified", Value: "true" },
      ],
      TemporaryPassword: employee.password,

      MessageAction: "SUPPRESS",
    };

    response = await client.send(new AdminCreateUserCommand(params));

    // Si querés que NO le pida cambio de contraseña:
    if (makePermanent && response?.User?.Username) {
      await client.send(
        new AdminSetUserPasswordCommand({
          UserPoolId: employeePoolId,
          Username: response.User.Username,
          Password: employee.password,
          Permanent: true,
        })
      );
    }

    console.log("Empleado creado exitosamente en Cognito:", {
      username: response?.User?.Username,
      email: employee.email,
      makePermanent,
    });

    return response;
  } catch (error) {
   
    console.error("Error al crear el empleado en Cognito:", formatAwsError(error, {
      email: employee?.email,
      poolId: employeePoolId,
      attemptedUsername: options?.useUniqueUsername ? "unique(email+timestamp)" : employee?.email,
      lastResponse: response,
    }));

    throw error;
  }
};

async function findUserByEmail(poolId, emailToSearch) {
  const command = new ListUsersCommand({
    UserPoolId: poolId,
    Filter: `email = "${emailToSearch}"`,
    Limit: 1,
  });

  const res = await client.send(command);
  return res?.Users?.[0] || null;
}

async function getCognitoEmployeeByEmail(emailToSearch) {
  try {
    return await client.send(
      new ListUsersCommand({
        UserPoolId: employeePoolId,
        Filter: `email = "${emailToSearch}"`,
        Limit: 1,
      })
    );
  } catch (error) {
    console.error("Error buscando empleado en Cognito:", formatAwsError(error, { emailToSearch }));
    throw error;
  }
}

exports.deleteEmployeeAccount = async (email) => {
  try {
    if (!employeePoolId) throw new Error("Missing env: COGNITO_EMPLOYEE_POOL_ID");
    if (!email) throw new Error("Email is required to delete employee");

    const userToDelete = await getCognitoEmployeeByEmail(email);
    const username = userToDelete?.Users?.[0]?.Username;

    if (!username) {
      console.log("No se encontró empleado para borrar en Cognito:", { email });
      return { deleted: false, reason: "NOT_FOUND" };
    }

    await client.send(
      new AdminDeleteUserCommand({
        UserPoolId: employeePoolId,
        Username: username,
      })
    );

    return { deleted: true, username };
  } catch (error) {
    console.error("Error borrando empleado en Cognito:", formatAwsError(error, { email }));
    throw error;
  }
};

function generateUniqueUsername(email) {
  const timestamp = Date.now().toString();
  return `${email}_${timestamp}`;
}

async function getCognitoUserByEmail(emailToSearch) {
  try {
    return await client.send(
      new ListUsersCommand({
        UserPoolId: userPoolId,
        Filter: `email = "${emailToSearch}"`,
        Limit: 1,
      })
    );
  } catch (error) {
    console.error("Error buscando usuario en Cognito:", formatAwsError(error, { emailToSearch }));
    throw error;
  }
}

exports.deleteUserAccount = async (email) => {
  try {
    if (!userPoolId) throw new Error("Missing env: COGNITO_USER_POOL_ID");
    if (!email) throw new Error("Email is required to delete user");

    const userToDelete = await getCognitoUserByEmail(email);
    const username = userToDelete?.Users?.[0]?.Username;

    if (!username) {
      console.log("No se encontró usuario para borrar en Cognito:", { email });
      return { deleted: false, reason: "NOT_FOUND" };
    }

    await client.send(
      new AdminDeleteUserCommand({
        UserPoolId: userPoolId,
        Username: username,
      })
    );

    return { deleted: true, username };
  } catch (error) {
    console.error("Error borrando usuario en Cognito:", formatAwsError(error, { email }));
    throw error;
  }
};

// Helpers
function formatAwsError(error, extra = {}) {
  return {
    name: error?.name,
    message: error?.message,
    statusCode: error?.$metadata?.httpStatusCode,
    requestId: error?.$metadata?.requestId,
    fault: error?.$fault,
    // AWS SDK v3 a veces tiene "Code" en name, pero dejo todo
    extra,
  };
}
