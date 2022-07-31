import { Stack, StackProps } from "aws-cdk-lib";
import { CodeBuildStep, CodePipeline, CodePipelineSource } from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";

export class HelthBotPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, "HelthBotPipeline", {
        pipelineName: "HelthBotPipeline",
        synth: new CodeBuildStep("SynthStep", {
            input: CodePipelineSource.connection(
                "tsnaik/helth-bot",
                "main",
                {
                  connectionArn:
                      "arn:aws:codestar-connections:us-east-1:324872873278:connection/054653ee-510a-4c0c-9253-9fb17f432153"
                }
            ),
            installCommands: ["npm install -g aws-cdk"],
            commands: ["cd helth-bot-cdk","npm ci", "npm run build", "npx cdk synth"]
        })
    });
  }
}