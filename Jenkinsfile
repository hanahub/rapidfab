pipeline {
    agent {
        label 'docker'
    }
    stages {
        stage('Docker Image') {
            when {
                expression {
                    not sh(returnStdout: true, script: 'docker ps -q -f "name=mes"')
                }
            }
            steps {
                withEnv(["GITDESCRIBE=${sh(returnStdout: true, script: 'git describe | tr -d \'\n\'')}"]) {
                    sh 'docker build -t authentise/mes:$GITDESCRIBE .'
                }
            }
        }
        stage('Build') {
            steps {
                withEnv(["GITDESCRIBE=${sh(returnStdout: true, script: 'git describe | tr -d \'\n\'')}"]) {
                    sh 'docker run --rm -v $(pwd):/src -v ~/.aws:/root/.aws authentise/mes:$GITDESCRIBE /src/jenkins'
                }
            }
        }
    }
}
