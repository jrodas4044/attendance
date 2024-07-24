import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { RekognitionClient, CompareFacesCommand, CompareFacesCommandInput } from '@aws-sdk/client-rekognition'; // ES Modules import

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  // Verificar si el body está definido
  if (!event.body) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*", // Restrict this to domains you trust
        "Access-Control-Allow-Headers": "*", // Specify only the headers you need to allow
      },
      body: JSON.stringify({ message: 'Request body is missing' }),
    };
  }

  let data;
  try {
    // Analizar el body
    data = JSON.parse(event.body);
  } catch (error) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*", // Restrict this to domains you trust
        "Access-Control-Allow-Headers": "*", // Specify only the headers you need to allow
      },
      body: JSON.stringify({ message: 'Invalid JSON format' }),
    };
  }

  // Crear instancia del cliente Rekognition
  const client = new RekognitionClient({});

  try {
    // Preparar los datos de entrada para el comando CompareFaces
    const input: CompareFacesCommandInput = {
      SourceImage: {
        S3Object: {
          Bucket: "face-gimmick-session",
          Name: `LCPJI/${data.targetImage}.jpg`, // Ajuste para evitar undefined
        },
      },
      TargetImage: {
        S3Object: {
          Bucket: "face-gimmick-session",
          Name: data.referenceImage, // Ajuste para evitar undefined
        },
      },
    };

    // Ejecutar el comando
    const command = new CompareFacesCommand(input);
    const response = await client.send(command);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Restrict this to domains you trust
        "Access-Control-Allow-Headers": "*", // Specify only the headers you need to allow
      },
      body: JSON.stringify({
        message: 'Comparison completed successfully',
        response,
      }),
    };
  } catch (error) {
    console.error('Error during face comparison:', error); // Log the error for debugging

    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*", // Restrict this to domains you trust
        "Access-Control-Allow-Headers": "*", // Specify only the headers you need to allow
      },
      body: JSON.stringify({
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};