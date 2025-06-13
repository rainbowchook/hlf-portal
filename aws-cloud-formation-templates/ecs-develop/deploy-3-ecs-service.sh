# Deploy stack
aws cloudformation create-stack \
  --region ap-southeast-1 \
  --stack-name hlf-portal-ecs-service-dev \
  --capabilities CAPABILITY_IAM \
  --template-body file://ecs-service-stack.yaml \
  --parameters file://ecs-service-parameters.json \
  # --profile __PROFILE_NAME__ # optional

aws cloudformation describe-stacks --stack-name hlf-portal-ecs-service-dev \
  --query "Stacks[0].StackStatus" --output text

aws cloudformation describe-stack-events --stack-name hlf-portal-ecs-service-dev

# Delete stack
aws cloudformation delete-stack \
  --region ap-southeast-1 \
  --stack-name hlf-portal-ecs-service-dev \
  # --profile __PROFILE_NAME__ # optional

# List running tasks to get the task ID
aws ecs list-tasks --cluster <cluster-name> --service-name <service-name>

# Execute interactive command in the container
aws ecs execute-command \
  --cluster <cluster-name> \
  --task <task-id> \
  --container <container-name> \
  --interactive \
  --command "/bin/bash"