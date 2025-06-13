# hlf-portal AWS Cloudformation Templates

## Parameters

```json
[
  {
    "ParameterKey": "VpcId",
    "ParameterValue": "vpc-0fa118c368aa2cbf9"
  },
  {
    "ParameterKey": "SubnetIds",
    "ParameterValue": "subnet-07383cea1b18a60fe,subnet-00b04ee5384cc6cff"
  },
  {
    "ParameterKey": "DBName",
    "ParameterValue": "portal"
  },
  {
    "ParameterKey": "DBUsername",
    "ParameterValue": "portaluser"
  }
]
```

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

### GitHub Connection

Deploy CloudFormation template with GitHub Connection:

- Connection Name: `hlf-portal-pipeline`
- Connection ARN: `arn:aws:codeconnections:ap-southeast-1:395630869830:connection/71b1e53e-9f5e-4e77-a9fe-ba592e83606b`

- GitHub Repo: `hlf-portal-pipeline`


### CloudFormation

CloudFormationResourcePermissions
```json

```