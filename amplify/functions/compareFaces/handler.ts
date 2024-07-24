import type {APIGatewayProxyHandlerV2} from 'aws-lambda';
import { RekognitionClient, CompareFacesCommand, CompareFacesCommandInput } from "@aws-sdk/client-rekognition"; // ES Modules import

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  // get SessionId from path parameter
  const { sessionId } = event.pathParameters ?? {};

  const client = new RekognitionClient({});

  try {
    const input: CompareFacesCommandInput = {
      SourceImage: {
        S3Object: {
          Bucket: "face-gimmick-session",
          Name: "LCPJI/Jonhathan Rolando Rodas López.jpg",
        },
      },
      TargetImage: {
        S3Object: {
          Bucket: "face-gimmick-session",
          Name: "a505e83f-8b8b-41d9-b823-004f48927b6c/reference.jpg",
        },
      },
    };
    const command = new CompareFacesCommand(input);

    const response = await client.send(command);

    return {
      statusCode: 200,
      // Modify the CORS settings below to match your specific requirements
      headers: {
        "Access-Control-Allow-Origin": "*", // Restrict this to domains you trust
        "Access-Control-Allow-Headers": "*", // Specify only the headers you need to allow
      },
      body: JSON.stringify({
        message: 'Hello World' ,
        response,
      }),
    };
  }catch (error) {
    return {
      statusCode: 500,
      // Modify the CORS settings below to match your specific requirements
      headers: {
        "Access-Control-Allow-Origin": "*", // Restrict this to domains you trust
        "Access-Control-Allow-Headers": "*", // Specify only the headers you need to allow
      },
      body: JSON.stringify({
        error,
      }),
    };
  }
};