pipeline {
    agent {
        label 'domain-qa'
    }

    options { 
        disableConcurrentBuilds() 
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
                nodejs(nodeJSInstallationName: 'Node') {
                    sh 'yarn'
                }
            }
        }
        stage ("Build") {
            steps {
                nodejs(nodeJSInstallationName: 'Node') {
                    sh 'yarn run build-qa'
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