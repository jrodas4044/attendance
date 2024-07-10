import { defineFunction } from '@aws-amplify/backend';

export const getFaceLiveness = defineFunction({
  // optionally specify a name for the Function (defaults to directory name)
  name: 'getFaceLiveness',
});
