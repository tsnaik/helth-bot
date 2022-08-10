import { Stage, StageProps }from 'aws-cdk-lib';
import { Construct } from "constructs";
import { HelthBotLambdaStack } from './helth-bot-cdk-stack';

export class HelthBotLambdaDeploymentStage extends Stage {
    
    constructor(scope: Construct, id: string, props?: StageProps) {
      super(scope, id, props);
  
      const lambdaStack = new HelthBotLambdaStack(this, 'LambdaStack');      
    }
}