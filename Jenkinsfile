pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'oussemamoussa/simple-mvc-app:latest'
    }
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/oussemamoussa98/projetdevops.git',
                    credentialsId: 'git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    dockerImageClient = docker.build("${DOCKER_IMAGE}")
                }
            }
        }
        stage('Scan Docker Image') {
            steps {
                script {
                    // Run Trivy to scan the Docker image
                    sh """
                    trivy image --severity LOW,MEDIUM,HIGH,CRITICAL \
                    --exit-code 0 --no-progress ${DOCKER_IMAGE}
                    """
                }
            }
        }
    }
}
