import { Stack, StackProps } from 'aws-cdk-lib';
import { Vpc, SecurityGroup, SubnetType, Peer, Port } from 'aws-cdk-lib/aws-ec2'
import { Construct } from 'constructs';

export class VpcStack extends Stack {
    readonly vpc: Vpc;
    readonly ingressSecurityGroup: SecurityGroup;
    readonly egressSecurityGroup: SecurityGroup;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.vpc = new Vpc(this, 'HelthBotVpc', {
            cidr: '10.0.0.0/16',
            maxAzs: 2,
            subnetConfiguration: [{
                cidrMask: 26,
                name: 'isolatedSubnet',
                subnetType: SubnetType.PRIVATE_ISOLATED,
            }],
            natGateways: 0
        });

        this.ingressSecurityGroup = new SecurityGroup(this, 'ingress-security-group', {
            vpc: this.vpc,
            allowAllOutbound: false,
            securityGroupName: 'IngressSecurityGroup',
        });
        this.ingressSecurityGroup.addIngressRule(Peer.ipv4('10.0.0.0/16'), Port.tcp(6969));
        
        this.egressSecurityGroup = new SecurityGroup(this, 'egress-security-group', {
            vpc: this.vpc,
            allowAllOutbound: false,
            securityGroupName: 'EgressSecurityGroup',
        });
        this.egressSecurityGroup.addEgressRule(Peer.anyIpv4(), Port.tcp(80));
    }
}