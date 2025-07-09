# InnoOps AWS Node

InnoOps AWS Node is a Node.js application featuring complete CI/CD pipelines and deployment to AWS EC2, ECS, and EKS.

## Table of Contents
- [Features](#features)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [CI/CD Pipeline](#cicd-pipeline)
- [Deployment](#deployment)
  - [EC2 Deployment](#ec2-deployment)
  - [ECS Deployment](#ecs-deployment)
  - [EKS Deployment](#eks-deployment)
- [Monitoring](#monitoring)
- [Built With](#built-with)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features
- Node.js application using Express.js, Passport.js (local authentication), session cookies, EJS templating, and MongoDB.
- Dockerized application.
- AWS ECR for image repository.
- Jenkins for CI/CD pipelines.
- Docker Compose for deployment on AWS EC2.
- AWS ECS and EKS support for container orchestration.
- Infrastructure as Code with Terraform.
- Monitoring with Prometheus and Grafana.

## Requirements

- AWS account (free tier is sufficient for testing)
- AWS CLI configured
- Docker & Docker Compose
- Node.js (v16+ recommended)
- MongoDB
- Jenkins
- Terraform
- Trivy (for image scanning)
- SonarQube (for code quality)
- Nginx (for reverse proxy and SSL)
- Prometheus & Grafana (for monitoring)

## Getting Started

### Prerequisites

- AWS account with necessary permissions
- SSH access to EC2 instance(s)
- Security groups configured for required ports (e.g., 22, 80, 443, 8090, 27017, 9000)

### Installation

#### 1. Launch EC2 Instance

- Create a t2.large EC2 instance named `Nodejs-app` (Amazon Linux 2 recommended).
- SSH into the instance.

#### 2. Install Required Packages

**Docker**
```
sudo yum update -y
sudo yum install docker -y
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker ec2-user
```

**Jenkins**
```
sudo dnf install java-17-amazon-corretto -y
sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key
sudo yum upgrade -y
sudo yum install jenkins -y
sudo systemctl daemon-reload
sudo usermod -aG docker jenkins
sudo systemctl enable jenkins
sudo systemctl start jenkins
```

**Trivy**
```
sudo tee /etc/yum.repos.d/trivy.repo << EOF
[trivy]
name=Trivy repository
baseurl=https://aquasecurity.github.io/trivy-repo/rpm/releases/\$basearch/
gpgcheck=1
enabled=1
gpgkey=https://aquasecurity.github.io/trivy-repo/rpm/public.key
EOF

sudo yum -y update
sudo yum -y install trivy
```

**SonarQube**
```
docker run -d --name sonarqube -p 9000:9000 sonarqube
```

**MongoDB (as Docker container)**
```
docker network create app
docker run -d -p 27017:27017 --network app --name mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo
```

#### 3. Clone and Build the Application

```
git clone <your-repo-url>
cd Codeial-Container
docker build -t my-app .
```

#### 4. Run the Application Container

```
docker run -d -p 8090:8090 --network app my-app
```

#### 5. Set Up Nginx as Reverse Proxy with SSL

**Install Nginx and OpenSSL**
```
sudo yum install -y nginx openssl
```

**Generate Self-Signed SSL Certificate**
```
openssl genrsa -des3 -out ~/private-key.pem 2048
openssl req -new -x509 -key ~/private-key.pem -out ~/self-cert.pem -days 10950
sudo mkdir -p /etc/nginx/ssl
sudo mv ~/private-key.pem /etc/nginx/ssl/
sudo mv ~/self-cert.pem /etc/nginx/ssl/
```

**Edit Nginx Configuration**
- Add the following to your `nginx.conf`:
```
http {
    ...
    ssl_password_file /etc/keys/global.pass;
    ...
    server {
        listen       443 ssl;
        server_name  localhost;
        ssl_certificate           /etc/nginx/ssl/self-cert.pem;
        ssl_certificate_key       /etc/nginx/ssl/private-key.pem;
        ssl_session_cache         shared:SSL:1m;
        ssl_prefer_server_ciphers on;
        location / {
            proxy_pass http://localhost:8090;
        }
    }
}
```

**Test and Restart Nginx**
```
sudo nginx -t
sudo systemctl restart nginx
```

## Usage

- Access the application at `https://<EC2-Public-IP>/`
- Default MongoDB credentials: `admin/password` (change in production)
- Jenkins: `http://<EC2-Public-IP>:8080`
- SonarQube: `http://<EC2-Public-IP>:9000`

## CI/CD Pipeline

- Jenkins pipeline builds, tests, scans (Trivy), and pushes Docker images to AWS ECR.
- SonarQube for code quality analysis.
- Terraform for infrastructure provisioning.
- Automated deployment to EC2/ECS/EKS.

## Deployment

### EC2 Deployment

- Uses Docker Compose for multi-container setup (app + MongoDB).
- Nginx as reverse proxy with SSL.

### ECS Deployment

- Push Docker image to AWS ECR.
- Create ECS cluster and service using Terraform or AWS Console.
- Update ECS task definition with new image.

### EKS Deployment

- Push Docker image to AWS ECR.
- Use Kubernetes manifests or Helm charts for deployment.
- Configure Ingress for SSL termination.

## Monitoring

- Prometheus and Grafana monitor Jenkins and application metrics.
- Prometheus scrapes metrics endpoints.
- Grafana dashboards visualize metrics.

## Built With

- Node.js, Express.js, Passport.js, EJS, MongoDB
- Docker, Docker Compose
- AWS EC2, ECS, EKS, ECR
- Jenkins, SonarQube, Trivy
- Terraform
- Nginx, OpenSSL
- Prometheus, Grafana

## Contributing

Contributions are welcome! Please open issues or submit pull requests.

## License



## Acknowledgments

- AWS documentation
- Docker and Jenkins communities
- Open source contributors

