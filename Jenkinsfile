pipeline {
    agent any
    
    environment {
                ANGULAR_IMAGE = "dinesh14coder/rmkv:angular${BUILD_NUMBER}"
                REGISTRY_CREDENTIALS = credentials("dock-cred")
                REPLACE="rmkv:angular${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url:'https://github.com/siva12819/rmkvFinal.git'
                sh "ls -ltr"
            }
        }
        stage('Build Image and Push') {
            steps {
                script {
                        sh 'docker --version'
                        sh 'whoami'
                        sh 'cd SprintTrack-UI && docker build -t ${ANGULAR_IMAGE} .' 
                        def dockerImage = docker.image("${ANGULAR_IMAGE}")
                        withDockerRegistry([credentialsId: 'dock-cred', url: 'https://index.docker.io/v1/']) { 
                            dockerImage.push()
                        }
                }
            }
        }
        stage('Deploy') {
            steps {
                sh 'sed -i -E "s/rmkv:.*/${REPLACE}/g" docker-compose.yaml'
                sh "ls -ltr"
                sh 'docker-compose -f docker-compose.yaml up -d'
            }
        }
        stage('Update Deployment File') {
            environment {
                GIT_REPO_NAME = "rmkvlocal"
                GIT_USER_NAME = "dines14-coder"
            }
            steps {
                withCredentials([string(credentialsId: 'rmkv', variable: 'GITHUB_TOKEN')]) {
                    sh '''
                        git config user.email "dvrdineshdvrdinesh728@gmail.com"
                        git config user.name "dines14-coder"
                        git add docker-compose.yaml
                        git commit -m "Update deployment image to version ${BUILD_NUMBER}"
                        git push https://${GITHUB_TOKEN}@github.com/${GIT_USER_NAME}/${GIT_REPO_NAME} HEAD:main
                    '''
                }
            }
        }
    }
}
