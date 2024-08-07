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
1. Create an AWS EC2 instance for t2.large instance with name Nodejs-app and SSH to EC2 instance.
2. Install all the reuired packages using below command.
Docker
```
sudo yum update -y
sudo install docker
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker ec2-user
```
Jenkins
```
sudo dnf install java-17-amazon-corretto -y
sudo java -version
sudo wget -O /etc/yum.repos.d/jenkins.repo \
    https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key
sudo yum upgrade
sudo yum install jenkins -y
sudo systemctl daemon-reload
sudo usermod -aG docker jenkins
sudo systemctl enable jenkins.service
sudo systemctl start jenkins.service
```
Trivy
```
sudo tee /etc/yum.repos.d/trivy.repo << EOF
[trivy]
name=Trivy repository
baseurl=https://aquasecurity.github.io/trivy-repo/rpm/releases/$basearch/
gpgcheck=1
enabled=1
gpgkey=https://aquasecurity.github.io/trivy-repo/rpm/public.key
EOF

sudo yum -y update
sudo yum -y install trivy
```

3. Run the sonarqube container
```
docker run -d --name sonarqube -p 9000:9000 -p 9092:9092 sonarqube
```

5. YOu can verify the that app is running with images.
   Build the image and run the container
   ```
   docker network create app
   docker run -d -p 27017:27017 --network app --name mongodb \
        -e MONGO_INITDB_ROOT_USERNAME=admin \
        -e MONGO_INITDB_ROOT_PASSWORD=password \
        mongo
   docker build -t my-app .
   docker run -d -p 8090:8090 --network app my-app
   ```
7. Use nginx as reverse proxy
```
sudo yum install -y nginx
sudo vim /etc/nginx/nginx.conf
```
Past below in the file
```
server {
        listen       80;
        listen       [::]:80;
        server_name  <publuc Ip or domain name>;
        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;
        location / {
        proxy_pass http://localhost:8090;
        }
    }
```
### Setup the Jenkins 
- 

