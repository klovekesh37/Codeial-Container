pipeline {
    agent any
    // environment {
    //     SONAR_HOME = tool "Sonar"
        
    // }
    stages {
        stage("Code") {
            steps {
                git url: "https://github.com/klovekesh37/Codeial-Container.git", branch: "master"
                echo "Code Cloned Successfully"
            }
        }
        // stage("SonarQube Analysis") {
        //     steps {
        //         withSonarQubeEnv("Sonar") {
        //             sh "$SONAR_HOME/bin/sonar-scanner -Dsonar.projectName=nodetodo -Dsonar.projectKey=nodetodo -X"
        //         }
        //     }
        // }
        // stage("SonarQube Quality Gates") {
        //     steps {
        //         timeout(time: 1, unit: "MINUTES") {
        //             waitForQualityGate abortPipeline: false
        //         }
        //     }
        // }
        stage("OWASP") {
            steps {
                dependencyCheck additionalArguments: '--scan ./', odcInstallation: 'OWASP'
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
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
                sh "trivy image node-app-v1:latest"
            }
        }
        stage("Push to Private Docker Hub Repo") {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
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
