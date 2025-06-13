# Set your environment variable first
ENVIRONMENT="dev"  # Change to "sit" or "prod" as needed

# Create the secure string parameter
aws ssm put-parameter \
    --name "/proj/hlf-portal-v1/${Environment}/rds/password" \
    --description "RDS database password for ${ENVIRONMENT} environment" \
    --value "YOUR_ACTUAL_PASSWORD_HERE" \
    --type "SecureString" \
    --overwrite

# Get parameter with decrypted value
aws ssm get-parameter \
    --name "/proj/hlf-portal-v1/${ENVIRONMENT}/rds/password" \
    --with-decryption

# Delete the parameter
aws ssm delete-parameter \
    --name "/proj/hlf-portal-v1/${ENVIRONMENT}/rds/password"