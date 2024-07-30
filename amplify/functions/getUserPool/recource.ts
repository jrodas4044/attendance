import { defineFunction } from '@aws-amplify/backend';

const getUserPool = defineFunction({
  name: 'getUserPool',
});

export default getUserPool;