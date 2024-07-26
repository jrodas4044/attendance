import { defineAuth } from "@aws-amplify/backend";
/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,

    // @ts-ignore
    externalProviders: {
      google: {
        // @ts-ignore
        clientId: secret('GOOGLE_CLIENT_ID'),
        // @ts-ignore
        clientSecret: secret('GOOGLE_CLIENT_SECRET')
      },

      callbackUrls: [
        'http://localhost:3000',
      ],
    }
  },

  userAttributes: {
    profilePicture: {
      required: false,
    },

    fullname: {
      required: false,
    },

    locale: {
      required: false,
    }
  }
  });


