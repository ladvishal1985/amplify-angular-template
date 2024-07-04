import { auth } from './auth/resource';
import { data } from './data/resource';
import { defineBackend } from '@aws-amplify/backend';
import { storage } from './storage/resource';

defineBackend({
  auth,
  data,
  storage
});
