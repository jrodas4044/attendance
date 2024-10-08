import type {APIGatewayProxyHandlerV2} from 'aws-lambda';
import { RekognitionClient, GetFaceLivenessSessionResultsCommand } from "@aws-sdk/client-rekognition"; // ES Modules import

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  // get SessionId from path parameter
  const { sessionId } = event.pathParameters ?? {};

  const client = new RekognitionClient({});
  const input = { // GetFaceLivenessSessionResultsRequest
    SessionId: sessionId, // required
  };
  const command = new GetFaceLivenessSessionResultsCommand(input);
  const response = await client.send(command);


  return {
    statusCode: 200,
    // Modify the CORS settings below to match your specific requirements
    headers: {
      "Access-Control-Allow-Origin": "*", // Restrict this to domains you trust
      "Access-Control-Allow-Headers": "*", // Specify only the headers you need to allow
    },
    body: JSON.stringify({
      sessionId,
      response,
    }),
  };
};