pipeline {
    agent any
    environment {
        SONAR_HOME = tool "SonarQubeScanner"
        
    }
    stages {
        stage("Code") {
            steps {
                git url: "https://github.com/klovekesh37/Codeial-Container.git", branch: "master"
                echo "Code Cloned Successfully"
            }
        }
        stage("SonarQube Analysis") {
            steps {
                withSonarQubeEnv("SonarQubeInstallations") {
                    sh "$SONAR_HOME/bin/sonar-scanner -Dsonar.projectName=nodetodo -Dsonar.projectKey=nodetodo -X"
                }
            }
        }
        stage("SonarQube Quality Gates") {
            steps {
                timeout(time: 1, unit: "MINUTES") {
                    waitForQualityGate abortPipeline: false
                }
            }
        }
        stage("OWASP") {
            steps {

               dependencyCheck additionalArguments: ''' 
                    -o './'
                    -s './'
                    -f 'ALL' 
                    --prettyPrint''', odcInstallation: 'OWASP'
        
                dependencyCheckPublisher pattern: 'dependency-check-report.html'
            }
        }
        stage("Build & Test") {
            steps {
                sh 'docker build -t node-app-v1:latest .'
                echo "Code Built Successfully"
            }
        }
        stage("Trivy") {
            steps {
                sh 'trivy image --format template --template "@/usr/local/share/trivy/templates/html.tpl"  node-app-v1:latest -o report.html'
            }
        }
        stage("Push to Private Docker Hub Repo") {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'Docker-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        def dockerUsername = env.DOCKER_USERNAME
                        def dockerPassword = env.DOCKER_PASSWORD
                        sh "echo ${dockerPassword} | docker login -u ${dockerUsername} --password-stdin"
                        sh "docker tag node-app-v1:latest ${dockerUsername}/node-app-v1:latest"
                        sh "docker push ${dockerUsername}/node-app-v1:latest"
                    }
                }
            }
        }
        stage("Deploy") {
            steps {
                sh "docker-compose down && docker-compose up -d"
                echo "App Deployed Successfully"
            }
        }
    }
}
