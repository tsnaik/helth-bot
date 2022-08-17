import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { InstanceClass, InstanceSize, InstanceType, SecurityGroup, SubnetType, Vpc } from 'aws-cdk-lib/aws-ec2'
import { Construct } from 'constructs';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager'
import { Credentials, DatabaseInstance, DatabaseInstanceEngine, DatabaseInstanceProps, PostgresEngineVersion } from 'aws-cdk-lib/aws-rds'
import { StringParameter } from 'aws-cdk-lib/aws-ssm';

export interface RDSPostgresStackProps extends StackProps {
    vpc: Vpc;
}

export class RDSPostgresStack extends Stack {

    readonly rdsInstance: DatabaseInstance;

    constructor(scope: Construct, id: string, props: RDSPostgresStackProps) {
        super(scope, id, props);
        
        // first, lets generate a secret to be used as credentials for our database
        const databaseCredentialsSecret = new Secret(this, `HelthDBCredentialsSecret`, {
            secretName: `helthdb-credentials`,
            generateSecretString: {
                secretStringTemplate: JSON.stringify({
                    username: 'postgres',
                }),
                excludePunctuation: true,
                includeSpace: false,
                generateStringKey: 'password'
            }
        });

        new CfnOutput(this, 'Secret Name', { value: databaseCredentialsSecret.secretName }); 
        new CfnOutput(this, 'Secret ARN', { value: databaseCredentialsSecret.secretArn }); 
        new CfnOutput(this, 'Secret Full ARN', { value: databaseCredentialsSecret.secretFullArn || '' });

        new StringParameter(this, 'DBCredentialsArn', {
            parameterName: `helthdb-credentials-arn`,
            stringValue: databaseCredentialsSecret.secretArn,
        });

        let defaultSecurityGroup = SecurityGroup.fromSecurityGroupId(this, "SG", props.vpc.vpcDefaultSecurityGroup);

        const rdsConfig: DatabaseInstanceProps = {
            engine: DatabaseInstanceEngine.postgres({ version: PostgresEngineVersion.VER_14_2 }),
            instanceType: InstanceType.of(InstanceClass.M5, InstanceSize.LARGE),
            vpc: props.vpc,
            vpcSubnets: {
                subnetType: SubnetType.PRIVATE_ISOLATED,
            },
            instanceIdentifier: `helthdb`,
            maxAllocatedStorage: 200,
            securityGroups: [defaultSecurityGroup],
            credentials: Credentials.fromSecret(databaseCredentialsSecret),
        };

        this.rdsInstance = new DatabaseInstance(this, `helthdb-instance`, rdsConfig);

        new CfnOutput(this, 'RDS Endpoint', { value: this.rdsInstance.dbInstanceEndpointAddress });
    }

}