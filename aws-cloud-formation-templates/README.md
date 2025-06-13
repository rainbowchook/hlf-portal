# hlf-portal AWS Cloudformation Templates

## AWS CLI

Each stack has its own set of parameters in a `.json` file.

#### StackName
[Do _NOT_ run as a script file.]  Example AWS CLI commands (`create-stack`, `delete-stack`, etc.) found here for each stack:
- [hlf-portal-ecs-cluster-dev](./ecs-develop/deploy-1-ecs-cluster.sh)
- [hlf-portal-rds-dev](./ecs-develop/deploy-2-rds.sh)
- [hlf-portal-ecs-service-dev](./ecs-develop/deploy-3-ecs-service.sh)

#### TemplatePath
- [ECS Cluster stack template](./ecs-develop/ecs-cluster-stack.yaml)
- [RDS stack template](./ecs-develop/rds-stack.yaml)
- [ECS Service stack template](./ecs-develop/ecs-service-stack.yaml)

#### CloudFormationResourcePermissions:
- [ECS Cluster CF Resource Permissions](./ecs-develop/ecs-cluster-cf-resource-permissions.json)
- [RDS CF Resource Permissions](./ecs-develop/rds-cf-resource-permissions.json)
- [ECS Service CF Resource Permissions](./ecs-develop/ecs-service-cf-resource-permissions.json)

#### AWS CLI Parameters:
- [ECS Cluster stack parameters](./ecs-develop/ecs-cluster-parameters.json)
- [RDS stack parameters](./ecs-develop/rds-parameters.json)
- [ECS Cluster parameters](./ecs-develop/ecs-service-parameters.json)

## Possible Modifications

### RDS Security Group

In the RDS stack, change the RDSSecurityGroup accordingly:
- SecurityGroupIngress: 
  - Modify CidrIp (currently in same VPC as the ECS Service); or
  - Replace CidrIp with SourceSecurityGroupId (if you know what it is, or it can be kept in SSM Parameters to be resolved at time of creation)

### Container Environment Variables

In the ECS Service stack, change the Container Definition accordingly:
- Environment: include any Environment Variables, either from the Parameters or dynamic resolution from SSM Parameter (string value only - secure string values must be defined in Secret)
- Secret: SSM Parameter (secure string only) or Secrets Manager

## AWS CodePipeline

### Pipeline Creation

Pipeline creation steps:
1. Create new pipeline - Deploy to CloudFormation
2. Choose source 
  - [Source Provider: GitHub (via GitHub App)](#github-connection)
  - Output artifact format: CodePipeline default
3. [Configure CF template](#cloudformation-template-configuration)

### GitHub Connection

Deploy CloudFormation template with CodeConnections (Git Trigger):

GitHub Connection:
- Connection Name: `hlf-portal-pipeline`
- Connection ARN: `arn:aws:codeconnections:ap-southeast-1:395630869830:connection/71b1e53e-9f5e-4e77-a9fe-ba592e83606b`

- Select GitHub Repository name: `hlf-portal-pipeline`
- Default branch: main

### CloudFormation template configuration

Configure the pipeline's CloudFormation template details for the GitHub repo and individual stacks as follows:

#### CodePipeline Name
- DeployECSClusterToCFService
- DeployRDSToCFService
- DeployECSServiceToCFService

#### StackName
- [hlf-portal-ecs-cluster-dev](./ecs-develop/deploy-1-ecs-cluster.sh)
- [hlf-portal-rds-dev](./ecs-develop/deploy-2-rds.sh)
- [hlf-portal-ecs-service-dev](./ecs-develop/deploy-3-ecs-service.sh)

#### TemplatePath
- [ECS Cluster stack template](./ecs-develop/ecs-cluster-stack.yaml)
- [RDS stack template](./ecs-develop/rds-stack.yaml)
- [ECS Service stack template](./ecs-develop/ecs-service-stack.yaml)

#### CloudFormationResourcePermissions:
- [ECS Cluster CF Resource Permissions](./ecs-develop/ecs-cluster-cf-resource-permissions.json)
- [RDS CF Resource Permissions](./ecs-develop/rds-cf-resource-permissions.json)
- [ECS Service CF Resource Permissions](./ecs-develop/ecs-service-cf-resource-permissions.json)

#### TemplateConfiguration:
- [ECS Cluster stack parameters](./ecs-develop/ecs-cluster-template-configuration.json)
- [RDS stack parameters](./ecs-develop/rds-template-configuration.json)
- [ECS Cluster parameters](./ecs-develop/ecs-service-template-configuration.json)

#### ParameterOverrides
- Raw JSON string provided directly in the pipeline
- Overrides values from the template defaults OR the TemplateConfiguration file
- Useful for dynamic values or secrets from Parameter Store/Secrets Manager
- Format examples: `{"InstanceType":"t3.large","DBPassword":"{{resolve:secretsmanager:prod/db:password}}"}` or `{"Environment":"prod","DBPassword":"{{resolve:ssm-secure:prod/db/password:1}}"}`

### Debugging CloudFormation deployment failure

Troubleshooting: 

#### Least-privilege permissions
Allow full admin permissions in the CloudFormationResourcePermissions like the example of [unlimited CF resource permissions](./ecs-develop/unlimited-cf-resource-permissions.json)

#### Files
- Ensure that template file path and template configuration path are correct.
- Ensure that the template configuration format is correct (not the same format as parameters file expected by AWS CLI command)