# InnoOps AWS Node


InnoOps AWS Node is a Nodejs application with complete CI/CD pipelines and deploye to AWS EC2, ECS and EKS.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [CI/CD Pipeline](#cicd-pipeline)
- [Deployment](#deployment)
- [Built With](#built-with)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features
- Nodejs application with Expressjs and use the local passport authentication and session cookies and EJS and mongodb as a DB
- Docker to build the image
- AWS ECR for image repository
- Jenkins for CI/CD pipelines
- Using Dockor-compose on AWS EC2 for the application deployment.
- AWS ECS for container application
- AWS EKS for the container application
- Terraform as a IaC
- Prometheus and grafana for montoring the Jenkins.

## Getting Started

### Prerequisites
- You should have an AWS account (can use the free tier account).

### Installation
1. Create an AWS EC2 instance with name Nodejs-app and SSH to EC2 instance.
2. Install the docker using below command.
```
sudo yum update -y
sudo amazon-linux-extras install docker
sudo service docker start
sudo systemctl start docker
sudo usermod -a -G docker ec2-user
```
3. Create 
