import { Stage, StageProps }from 'aws-cdk-lib';
import { Construct } from "constructs";
import { HelthBotLambdaStack } from './lambda-stack';
import { RDSPostgresStack } from './rds-postgres-stack';
import { VpcStack } from './vpc-stack';

export class HelthBotLambdaDeploymentStage extends Stage {
    
    constructor(scope: Construct, id: string, props?: StageProps) {
      super(scope, id, props);
  
      const vpcStack = new VpcStack(this, 'HelthBotVpcStack');
      const rdsPostgresStack = new RDSPostgresStack(this, 'HelthBotRDSPostgres', { vpc: vpcStack.vpc });
      rdsPostgresStack.addDependency(vpcStack);
      const lambdaStack = new HelthBotLambdaStack(this, 'LambdaStack');      
    }
}