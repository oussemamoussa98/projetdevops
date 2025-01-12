pipeline {
    agent any

    triggers {
        pollSCM('H/5 * * * *') // Poll SCM every 5 minutes
    }

    environment {
        IMAGE_NAME = 'oussemamoussa/simple-mvc-app'  // Docker Hub image name
        DOCKERHUB_CREDENTIALS = 'dockerhub'  // Docker Hub credentials ID
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    echo 'Starting Git checkout....'
                    git branch: 'main',
                        url: 'https://github.com/oussemamoussa98/projetdevops.git',
                        credentialsId: 'git'  // Jenkins credentials ID for GitHub SSH key
                }
            }
        }

        stage('Build Image') {
            steps {
                dir('simple-mvc-app') {
                    script {
                        try {
                            echo 'Building image...'
                            dockerImage = docker.build("${IMAGE_NAME}")
                        } catch (Exception e) {
                            error "Failed to build image: ${e.message}"
                        }
                    }
                }
            }
        }

        

        stage('Scan Image') {
            steps {
                script {
                    echo 'Scanning image...'
                    sh """
                        docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
                        aquasec/trivy:latest image --exit-code 0 \
                        --severity LOW,MEDIUM,HIGH,CRITICAL \
                        ${IMAGE_NAME}
                    """
                }
            }
        }

        

        stage('Push Images to Docker Hub') {
            steps {
                script {
                    echo 'Pushing images to Docker Hub...'
                    docker.withRegistry('', DOCKERHUB_CREDENTIALS) {
                        dockerImage.push()
                    }
                }
            }
        }
    }


}
