import { defineBackend } from '@aws-amplify/backend';
import * as cdk from 'aws-cdk-lib';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { myApiFunction } from "./api/resource";


defineBackend({
  auth,
  data,
  myApiFunction,
});
