import { Stack, StackProps } from "aws-cdk-lib";
import { BuildSpec, LinuxArmBuildImage, LinuxBuildImage } from "aws-cdk-lib/aws-codebuild";
import { CodeBuildStep, CodePipeline, CodePipelineSource } from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";

export class HelthBotPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, "HelthBotPipeline", {
        pipelineName: "HelthBotPipeline",
        synth: new CodeBuildStep("SynthStep", {
            partialBuildSpec: BuildSpec.fromObject({
              version: "0.2",
                phases: {
                  install: {
                    "runtime-versions": {
                      nodejs: "16.x"
                    }
                  }
                }
            }),
            buildEnvironment: { buildImage: LinuxBuildImage.AMAZON_LINUX_2_4 },
            input: CodePipelineSource.connection(
                "tsnaik/helth-bot",
                "dev",
                {
                  connectionArn:
                      "arn:aws:codestar-connections:us-east-1:324872873278:connection/054653ee-510a-4c0c-9253-9fb17f432153"
                }
            ),
            installCommands: ["npm install -g aws-cdk"],
            commands: ["npm --version", "npm ci", "npm run build", "npx cdk synth"]
        })
    });
  }
}