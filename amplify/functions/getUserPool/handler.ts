import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { json } from 'stream/consumers';

export const handler = async (event: any) => {
  const email = event.email;

  const cognito = new CognitoIdentityServiceProvider();

  try {
    const params = {
      UserPoolId: 'us-east-1_GztOL1eId',
      Filter: `email = "${email}"`,
      Limit: 1
    };

    const response = await cognito.listUsers(params).promise();

    if (response.Users && response.Users.length > 0) {
      const user = response.Users[0];
      // Hacer algo con el usuario encontrado
      console.log('Usuario encontrado:', user);
    } else {
      console.log('Usuario no encontrado');
    }

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