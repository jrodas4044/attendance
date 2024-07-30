import { CognitoIdentityProviderClient, AdminGetUserCommand } from "@aws-sdk/client-cognito-identity-provider"; // ES Modules import


const client = new CognitoIdentityProviderClient({});

export const handler = async (event: any) => {
  const email = event.email;

  const command = new AdminGetUserCommand({
    UserPoolId: 'us-east-1_GztOL1eId',
    Username: email
  });

  try {
    const response = await client.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify(response)
    };
  } catch (error) {
    console.error('Error al buscar el usuario:', error);
    return {
      statusCode: 500,
      body: 'Error al buscar el usuario'
    };
  }
};
