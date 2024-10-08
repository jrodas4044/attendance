import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data, getCognitoUserByEmailFunction } from './data/resource.js';
import { myApiFunction } from "./functions/api-functions/resource";
import { getFaceLiveness } from "./functions/getFaceLiveness/resource";
import { compareFaces } from "./functions/compareFaces/resource";
import {getUserPool} from "./functions/getUserPool/resource";
import { Stack } from "aws-cdk-lib";
import {
  CorsHttpMethod,
  HttpApi,
  HttpMethod,
} from "aws-cdk-lib/aws-apigatewayv2";
import {
  HttpIamAuthorizer,
  HttpUserPoolAuthorizer,
} from "aws-cdk-lib/aws-apigatewayv2-authorizers";
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
import { Policy, PolicyStatement } from "aws-cdk-lib/aws-iam";


const backend = defineBackend({
  auth,
  data,
  getCognitoUserByEmailFunction,
  myApiFunction,
  getFaceLiveness,
  compareFaces,
  getUserPool,
});



backend.getFaceLiveness.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    actions: ["rekognition:GetFaceLivenessSession"],
    resources: ["*"],
  })
);

// Add rekognition:StartFaceLivenessSession permission to the unauthenticated User role
backend.auth.resources.unauthenticatedUserIamRole.addToPrincipalPolicy(
  new PolicyStatement({
    actions: ["rekognition:StartFaceLivenessSession"],
    resources: ["*"],
  })
);

// Add rekognition:CreateFaceLivenessSession permission to the  User role
backend.auth.resources.authenticatedUserIamRole.addToPrincipalPolicy(
  new PolicyStatement({
    actions: ["rekognition:StartFaceLivenessSession"],
    resources: ["*"],
  })
);

// Add rekognition:CompareFaces permission to the compareFaces function
backend.compareFaces.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    actions: ["rekognition:CompareFaces"],
    resources: ["*"],
  })
);

// add s3 permission tu compareFaces function
backend.compareFaces.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    actions: ["s3:GetObject", "S3:ReadObject"],
    resources: ["*"],
  })
);


backend.myApiFunction.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    actions: ["rekognition:CreateFaceLivenessSession"],
    resources: ["*"],
  })
);

// add s3 permission tu myApiFunction
backend.myApiFunction.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    actions: ["s3:PutObject", "s3:GetObject", "s3:ListBucket"],
    resources: ["*"],
  })
);

// Add acces to KMS key to myApiFunction
backend.myApiFunction.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    actions: ["kms:Decrypt", "kms:Encrypt"],
    resources: ["*"],
  })
);


backend.getFaceLiveness.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    actions: ["rekognition:GetFaceLivenessSessionResults"],
    resources: ["*"],
  })
);

backend.getFaceLiveness.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    actions: ["s3:GetObject", "s3:PutObject"],
    resources: ["*"],
  })
);

/// agregar funcion de getUserPool
backend.getUserPool.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    actions: ["cognito-idp:AdminGetUser"],
    resources: ["*"],
  })
);

backend.getCognitoUserByEmailFunction.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    actions: ["cognito-idp:AdminGetUser"],
    resources: ["*"],
  })
);
// create a new API stack
const apiStack = backend.createStack("api-stack");

// create a IAM authorizer
const iamAuthorizer = new HttpIamAuthorizer();

// create a User Pool authorizer
const userPoolAuthorizer = new HttpUserPoolAuthorizer(
  "userPoolAuth",
  backend.auth.resources.userPool,
  {
    userPoolClients: [backend.auth.resources.userPoolClient],
  }
);

// create a new HTTP API with IAM as default authorizer
const httpApi = new HttpApi(apiStack, "HttpApi", {
  apiName: "myHttpApi",
  corsPreflight: {
    // Modify the CORS settings below to match your specific requirements
    allowMethods: [
      CorsHttpMethod.GET,
      CorsHttpMethod.POST,
      CorsHttpMethod.PUT,
      CorsHttpMethod.DELETE,
    ],
    // Restrict this to domains you trust
    allowOrigins: ["*"],
    // Specify only the headers you need to allow
    allowHeaders: ["*"],
  },
  createDefaultStage: true,
});

// create a new HTTP Lambda integration
const httpLambdaIntegration = new HttpLambdaIntegration(
  "LambdaIntegration",
  backend.myApiFunction.resources.lambda
);

// add routes to the API with a IAM authorizer and different methods
httpApi.addRoutes({
  path: "/session",
  methods: [HttpMethod.GET, HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE],
  integration: httpLambdaIntegration,
  authorizer: iamAuthorizer,
});

// Add getFaceLiveness function to the API
const getFaceLivenessIntegration = new HttpLambdaIntegration(
  "GetFaceLivenessIntegration",
  backend.getFaceLiveness.resources.lambda
);

httpApi.addRoutes({
  path: "/session/{sessionId}/liveness",
  methods: [HttpMethod.GET],
  integration: getFaceLivenessIntegration,
  authorizer: iamAuthorizer,
});

// Add compareFaces function to the API
const compareFacesIntegration = new HttpLambdaIntegration(
  "CompareFacesIntegration",
  backend.compareFaces.resources.lambda
);

httpApi.addRoutes({
  path: "/session/compare",
  methods: [HttpMethod.POST],
  integration: compareFacesIntegration,
  authorizer: iamAuthorizer,
});

// Add getUserPool function to the API
const getUserPoolIntegration = new HttpLambdaIntegration(
  "getUserPoolIntegration",
  backend.getUserPool.resources.lambda
);

httpApi.addRoutes({
  path: "/user/{userId}",
  methods: [HttpMethod.GET],
  integration: getUserPoolIntegration,
  authorizer: iamAuthorizer,
});

const apiPolicy = new Policy(apiStack, "ApiPolicy", {
  statements: [
    new PolicyStatement({
      actions: ["execute-api:Invoke"],
      resources: ["*"],
    }),
  ],
});

// attach the policy to the authenticated and unauthenticated IAM roles
backend.auth.resources.authenticatedUserIamRole.attachInlinePolicy(apiPolicy);
backend.auth.resources.unauthenticatedUserIamRole.attachInlinePolicy(apiPolicy);

// add outputs to the configuration file
backend.addOutput({
  custom: {
    API: {
      [httpApi.httpApiName!]: {
        endpoint: httpApi.url,
        region: Stack.of(httpApi).region,
        apiName: httpApi.httpApiName,
      },
    },
  },
});



