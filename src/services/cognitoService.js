const crypto = require("crypto");
const {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
  AdminDeleteUserCommand,
  AdminSetUserPasswordCommand,
  ListUsersCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

// ============================
// Cognito Client
// ============================
const client = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION,
  credentials:
    process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
      ? {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
      : undefined,
});

const employeePoolId = process.env.COGNITO_EMPLOYEE_POOL_ID;
const userPoolId = process.env.COGNITO_USER_POOL_ID;

// ============================
// Helpers
// ============================
function formatAwsError(error, extra = {}) {
  return {
    name: error?.name,
    message: error?.message,
    statusCode: error?.$metadata?.httpStatusCode,
    requestId: error?.$metadata?.requestId,
    fault: error?.$fault,
    extra,
  };
}

function generateUsernameFromEmail(email) {
  const safe = (email || "user")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "_")
    .slice(0, 30);

  const rand = crypto.randomBytes(6).toString("hex");
  return `${safe}_${rand}`;
}

async function findUserByEmail(poolId, emailToSearch) {
  const res = await client.send(
    new ListUsersCommand({
      UserPoolId: poolId,
      Filter: `email = "${emailToSearch}"`,
      Limit: 1,
    })
  );

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
    console.error(
      "Error buscando empleado en Cognito:",
      formatAwsError(error, { emailToSearch, poolId: employeePoolId })
    );
    throw error;
  }
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
    console.error(
      "Error buscando usuario en Cognito:",
      formatAwsError(error, { emailToSearch, poolId: userPoolId })
    );
    throw error;
  }
}

// ============================
// Exports
// ============================

exports.createNewEmployee = async (employee, options = {}) => {
  let response;

  try {
    if (!employeePoolId) throw new Error("Missing env: COGNITO_EMPLOYEE_POOL_ID");
    if (!process.env.AWS_REGION) throw new Error("Missing env: AWS_REGION");
    if (!employee?.email) throw new Error("Employee email is required");
    if (!employee?.password) throw new Error("Employee password is required");

    const makePermanent = Boolean(options.makePermanent ?? employee.makePermanent);

    if (options.returnIfExists) {
      const existing = await findUserByEmail(employeePoolId, employee.email);
      if (existing) {
        return { alreadyExists: true, user: existing };
      }
    }

    const username = generateUsernameFromEmail(employee.email);

    const params = {
      UserPoolId: employeePoolId,
      Username: username,
      UserAttributes: [
        { Name: "email", Value: employee.email },
        { Name: "email_verified", Value: "true" },
        {
          Name: "name",
          Value: `${employee.first_name || ""} ${employee.last_name || ""}`.trim(),
        },
      ],
      TemporaryPassword: employee.password,
      MessageAction: "SUPPRESS",
    };

    response = await client.send(new AdminCreateUserCommand(params));

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

    return response; // contiene User.Username
  } catch (error) {
    console.error(
      "Error al crear el empleado en Cognito:",
      formatAwsError(error, {
        email: employee?.email,
        poolId: employeePoolId,
        lastResponse: response,
      })
    );
    throw error;
  }
};

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
    console.error(
      "Error borrando empleado en Cognito:",
      formatAwsError(error, { email, poolId: employeePoolId })
    );
    throw error;
  }
};

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
    console.error(
      "Error borrando usuario en Cognito:",
      formatAwsError(error, { email, poolId: userPoolId })
    );
    throw error;
  }
};
