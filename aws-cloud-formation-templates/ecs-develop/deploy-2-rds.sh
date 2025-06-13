# Deploy stack
aws cloudformation create-stack \
  --region ap-southeast-1 \
  --stack-name hlf-portal-rds-dev-stack \
  --capabilities CAPABILITY_IAM \
  --template-body file://rds-stack.yaml \
  --parameters file://rds-parameters.json \
  # --profile __PROFILE_NAME__ # optional

aws cloudformation describe-stacks --stack-name hlf-portal-rds-dev-stack \
  --query "Stacks[0].StackStatus" --output text

aws cloudformation describe-stack-events --stack-name hlf-portal-rds-dev-stack

# Delete stack
aws cloudformation delete-stack \
  --region ap-southeast-1 \
  --stack-name hlf-portal-rds-dev-stack \
  # --profile __PROFILE_NAME__ # optional