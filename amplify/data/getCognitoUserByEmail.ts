import { CognitoIdentityProviderClient, AdminGetUserCommand } from "@aws-sdk/client-cognito-identity-provider"; // ES Modules import
import type { Schema } from "./resource";


const client = new CognitoIdentityProviderClient({});

// @ts-ignore
export const handler: Schema['getCognitoUserByEmail']['functionHandler'] = async (
  event
) => {
  const email = event.arguments.email;

  const command = new AdminGetUserCommand({
    UserPoolId: 'us-east-1_GztOL1eId',
    Username: email
  });

  const response = await client.send(command);

  return response.Username;
};
