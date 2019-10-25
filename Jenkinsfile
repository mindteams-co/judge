def SendSlackMessage(message, color) {
    slackSend (channel: "$SLACK_CHANNEL", color: color, message: "$message: Job '${JOB_NAME} [${BUILD_NUMBER}]' (${BUILD_URL})")
}

@NonCPS
def getBuildCause() {
    def cause = ''
    try {
        for (buildCause in currentBuild.buildCauses) {
            if (buildCause != null) {
                echo "Build cause description: ${currentBuild.buildCauses}"
                description = buildCause.shortDescription
                if (description.contains("Branch indexing")) {
                    cause = 'indexing'
                }
                if (description.contains("Started by user")) {
                    cause = 'user'
                }
                if (description.contains("Push event")) {
                    cause = 'push'
                }
            }
        }
    } catch(msg) {
        echo "Error getting build cause: ${msg}"
    }
    return cause
}

pipeline {
    agent any
    options {
        disableConcurrentBuilds()
        parallelsAlwaysFailFast()
        gitLabConnection('jenkins-gitlab-config-name')
    }

    environment {
        BUILD_CAUSE = getBuildCause()
        COMPOSE_FILE = 'docker-compose.yml'
        PROJECT_NAME = 'judge'
        SLACK_CHANNEL = 'project-judge-dev'
        SSH_HOST = 'jenkins@178.62.190.55'
    }

    stages {
        stage('slack notification') {
            steps {
                script {
                    if (env.BUILD_CAUSE == 'user') {
                        SendSlackMessage('DEPLOYING', '#0000FF')
                    } else {
                        SendSlackMessage('TESTING', '#0000FF')
                    }
                }
            }
        }

        stage('build images #1') {
            parallel {
                stage('nginx') {
                    steps {
                        sh 'docker-compose build nginx'
                    }
                }
                stage('backend') {
                    steps {
                        sh 'cp ./backend/config/.env.dev ./backend/config/.env'
                        sh 'docker-compose build backend'
                    }
                }
                stage('frontend') {
                    steps {
                        sh 'docker-compose build frontend'
                    }
                }
            }
        }

        stage('deploy') {
            when {
                allOf {
                    expression { env.BUILD_CAUSE == 'user' }
                    expression { currentBuild.currentResult == 'SUCCESS' }
                }
            }
            stages {
                stage('copy project to lxc') {
                    steps {
                        sshagent(['49ae3b50-fc13-4072-9794-b308d96bc51d']) {
                            sh 'ssh -o StrictHostKeyChecking=no $SSH_HOST uptime'
                            sh 'rsync -rlptgDvzO --exclude=node_modules --exclude=__pycache__ --exclude=/reports . $SSH_HOST:/srv/$PROJECT_NAME'
                        }
                    }
                }
                stage('build images #2') {
                    steps {
                        sshagent(['49ae3b50-fc13-4072-9794-b308d96bc51d']) {
                            sh 'ssh -o StrictHostKeyChecking=no $SSH_HOST uptime'
                            sh "ssh -A $SSH_HOST 'cd /srv/$PROJECT_NAME; make build'"
                        }
                    }
                }
                stage('start project') {
                    steps {
                        sshagent(['49ae3b50-fc13-4072-9794-b308d96bc51d']) {
                            sh 'ssh -o StrictHostKeyChecking=no $SSH_HOST uptime'
                            sh "ssh -A $SSH_HOST 'cd /srv/$PROJECT_NAME; make prod'"
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            script {
                if (env.BUILD_CAUSE == 'user') {
                    SendSlackMessage('DEPLOYED', '#00FF00')
                } else {
                    SendSlackMessage('TESTS OK', '#00FF00')
                }
            }
        }
        unstable {
            SendSlackMessage('TESTS FAILED', '#FF0000')
        }
        failure {
            SendSlackMessage('BUILD FAILED', '#FF0000')
        }
        always {
            script {
                try {
                    build job: 'CleanUp', propagate: false, wait: false
                } catch(err) {
                    echo "CleanUp not started: ${err}"
                }
            }
        }
    }
}