# Deploy stack
aws cloudformation create-stack \
  --region ap-southeast-1 \
  --stack-name hlf-portal-ecs-cluster-dev \
  --capabilities CAPABILITY_IAM \
  --template-body file://ecs-cluster-stack.yaml \
  # --profile __PROFILE_NAME__ # optional

aws cloudformation describe-stacks --stack-name hlf-portal-ecs-cluster-dev \
  --query "Stacks[0].StackStatus" --output text

aws cloudformation describe-stack-events --stack-name hlf-portal-ecs-cluster-dev

# Delete stack
aws cloudformation delete-stack \
  --region ap-southeast-1 \
  --stack-name hlf-portal-ecs-cluster-dev \
  # --profile __PROFILE_NAME__ # optional