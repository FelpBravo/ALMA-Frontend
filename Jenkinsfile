pipeline {
    agent {
        label 'dev-node-1'
    }

    environment {
        IMAGE_NAME = "image-ms-frontend"
        IMAGE_TAG = "latest"
        PATH_COMPOSE = "/opt/librux/domain/docker-compose.yml"
        SERVICE_NAME = "frontend"
    }

    triggers {
        bitbucketPush()
    }

    stages {
        stage ("Install libraries") {
            steps {
                sh 'yarn install'
            }
        }
        stage ("Build") {
            steps {
                sh 'yarn run build-dev'
            }
        }
        stage ("Test") {
            steps {
                sh 'yarn run test'
                script {
                    def scannerHome = tool 'sonarqube-scanner'
                    withSonarQubeEnv(credentialsId: 'sonar-token') {
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    docker.build "${env.IMAGE_NAME}:${env.IMAGE_TAG}"
                }
                sh "docker-compose -f ${env.PATH_COMPOSE} up -d ${env.SERVICE_NAME}"
            }
        }
    }
    post {
        always {
            cleanWs(cleanWhenNotBuilt: true,
                    deleteDirs: true,
                    disableDeferredWipeout: true,
                    notFailBuild: true)
        }
    }
}