pipeline {
    agent {
        label 'docker'
    }
    stages {
        stage('Docker Image') {
            when {
                expression {
                    sh(script: '! docker ps -a -q -f "name=rapidfab" | read REPLY')
                }
            }
            steps {
                withEnv(["GITDESCRIBE=${sh(returnStdout: true, script: 'git describe | tr -d \'\n\'')}"]) {
                    sh 'docker build -t authentise/mes:$GITDESCRIBE .'
                    sh 'docker run -d --name rapidfab --env BROWSER=PhantomJS2 -v $(pwd):/src -v $$HOME/.aws:/root/.aws -d authentise/mes:$GITDESCRIBE sleep infinity'
                    sh 'docker exec rapidfab npm install'
                    sh 'docker exec rapidfab npm prune'
                    sh 'docker exec rapidfab npm run build:clean'
                }
            }
        }
        stage('Docker container start') {
            when {
                expression {
                    sh 'docker ps -q -f "name=rapidfab"'
                }
            }
            steps {
                sh 'docker start rapidfab'
            }
        }
        stage('Test') {
            steps {
                sh 'docker exec rapidfab npm run test:junit'
            }
        }
        stage('Build') {
            steps {
                    sh 'docker exec rapidfab npm run build:clean'
            }
        }
        stage('Publish Dev') {
            when {
                branch 'master'
            }
            steps {
                withEnv(["GITDESCRIBE=${sh(returnStdout: true, script: 'git describe | tr -d \'\n\'')}"]) {
                    withEnv(["IS_PROD=${sh(script: 'echo $GITDESCRIBE | grep \'\\-g\'')}"]) {
                        sh 'if [ $IS_PROD ]; then echo "pushing to prod"; else echo "pushing to dev"; fi'
                    }
                }
            }
        }
    }
    post {
        always {
            sh 'docker stop rapidfab'
        }
    }
}
