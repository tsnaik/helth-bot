import { Stack, StackProps } from 'aws-cdk-lib';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { RestApi, LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { Construct } from 'constructs';
import { Bucket } from 'aws-cdk-lib/aws-s3'

export class HelthBotLambdaStack extends Stack {

  private readonly sampleLambda: Function;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, "WidgetStore");

    this.sampleLambda = new Function(this, "DailyAttendanceLambda", {
      runtime: Runtime.NODEJS_16_X,
      code: Code.fromAsset("lambda-handlers"),
      handler: "sample.lambdaHandler"
    })

    const api = new RestApi(this, "widgets-api", {
      restApiName: "Sample Lambda",
      description: "This service serves nothing."
    });

    const sampleLambdaIntegration = new LambdaIntegration(this.sampleLambda, {
      requestTemplates: { "application/json": '{ "statusCode": "200" }' }
    });

    api.root.addMethod("GET", sampleLambdaIntegration);
  }
}
