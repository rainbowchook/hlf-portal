#!/bin/bash

# Build and tag Docker image
docker build --platform linux/amd64 -t samplenodejs:1.0.0 .
docker tag samplenodejs:1.0.0 395630869830.dkr.ecr.ap-southeast-1.amazonaws.com/samplenodejs:1.0.0

# Run docker container
docker run --rm -p 8080:8080 samplenodejs:1.0.0

# Push to ECR
# aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 395630869830.dkr.ecr.ap-southeast-1.amazonaws.com
# docker push 395630869830.dkr.ecr.ap-southeast-1.amazonaws.com/samplenodejs:1.0.0