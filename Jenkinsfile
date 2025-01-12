pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'oussemamoussa/simple-mvc-app:latest'
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
    }
    stages {
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t ${DOCKER_IMAGE} .'
            }
        }
        stage('Scan for Vulnerabilities') {
            steps {
                echo 'Scanning Docker image for vulnerabilities...'
                sh 'trivy image ${DOCKER_IMAGE}'
            }
        }
        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing Docker image to Docker Hub...'
                withDockerRegistry([credentialsId: 'DOCKERHUB_CREDENTIALS']) {
                    sh 'docker push ${DOCKER_IMAGE}'
                }
            }
        }
    }
}
