import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { RekognitionClient, CreateFaceLivenessSessionCommand } from "@aws-sdk/client-rekognition"; // ES Modules import
import { uuid } from 'uuidv4';

const client = new RekognitionClient();

export const handler: APIGatewayProxyHandlerV2 = async (event) => {

  const input = { // CreateFaceLivenessSessionRequest
    Settings: { // CreateFaceLivenessSessionRequestSettings
      OutputConfig: { // LivenessOutputConfig
        S3Bucket: "sessions-faces-udeo", // required
      },
      AuditImagesLimit: Number("int"),
    },
    ClientRequestToken: uuid(),
  };
  const command = new CreateFaceLivenessSessionCommand(input);
  const response = await client.send(command);
  return {
    statusCode: 200,
    // Modify the CORS settings below to match your specific requirements
    headers: {
      "Access-Control-Allow-Origin": "*", // Restrict this to domains you trust
      "Access-Control-Allow-Headers": "*", // Specify only the headers you need to allow
    },
    body: JSON.stringify(response),
  };
};