#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import 'source-map-support/register';
import { HelthBotPipelineStack } from '../lib/pipeline-stack';

const app = new App();
new HelthBotPipelineStack(app, "HelthBotPipelineStack", {
  env: {
    account: "324872873278",
    region: "us-east-1"
  }
});