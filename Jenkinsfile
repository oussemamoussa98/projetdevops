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

        stage('Build Server Image') {
            steps {
                dir('server') {
                    script {
                        try {
                            echo 'Building server image...'
                            dockerImageServer = docker.build("${IMAGE_NAME}")
                        } catch (Exception e) {
                            error "Failed to build server image: ${e.message}"
                        }
                    }
                }
            }
        }

        stage('Build Client Image') {
            steps {
                dir('client') {
                    script {
                        try {
                            echo 'Building client image...'
                            dockerImageClient = docker.build("${IMAGE_NAME}")
                        } catch (Exception e) {
                            error "Failed to build client image: ${e.message}"
                        }
                    }
                }
            }
        }

        stage('Scan Server Image') {
            steps {
                script {
                    echo 'Scanning server image...'
                    sh """
                        docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
                        aquasec/trivy:latest image --exit-code 0 \
                        --severity LOW,MEDIUM,HIGH,CRITICAL \
                        ${IMAGE_NAME}
                    """
                }
            }
        }

        stage('Scan Client Image') {
            steps {
                script {
                    echo 'Scanning client image...'
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
                        dockerImageServer.push()
                        dockerImageClient.push()
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                echo 'Cleaning up Docker resources...'

                // Remove dangling images (intermediate images with no tags)
                sh 'docker image prune -f'

                // Remove stopped containers
                sh 'docker container prune -f'

                // Optionally remove unused volumes
                sh 'docker volume prune -f'

                // Remove intermediate images (unused builder images)
                sh 'docker builder prune -f'
            }
        }
    }
}
