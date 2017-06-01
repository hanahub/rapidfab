pipeline {
    agent {
        label 'docker'
    }
    stages {
        stage('Docker Image') {
            when {
                expression {
                    not sh(returnStdout: true, script: 'docker ps -q -f "name=rapidfab"')
                }
            }
            steps {
                withEnv(["GITDESCRIBE=${sh(returnStdout: true, script: 'git describe | tr -d \'\n\'')}"]) {
                    sh 'docker build -t authentise/mes:$GITDESCRIBE .'
                    sh 'docker run --name rapidfab -v $(pwd):/src authentise/mes:$GITDESCRIBE npm install'
                    sh 'docker exec rapidfab -v $(pwd):/src npm prune'
                    sh 'docker exec rapidfab -v $(pwd):/src npm run build:clean'
                }
            }
        }
        stage('Test') {
            steps {
                sh 'docker -v $(pwd):/src --env BROWSER=PhantomJS2 exec rapidfab npm run test:junit'
            }
        }
        stage('Build') {
            steps {
                    sh 'docker exec rapidfab -v $(pwd):/src npm run build:clean'
            }
        }
        stage('Publish Dev') {
            when {
                branch 'master'
            }
            steps {
                withEnv(["GITDESCRIBE=${sh(returnStdout: true, script: 'git describe | tr -d \'\n\'')}"]) {
                    withEnv(["IS_PROD=${sh(script: 'echo $GITDESCRIBE | grep \'\-g\'')}"]) {
                        sh 'if [ $IS_PROD ]; then echo "pushing to prod"; else echo "pushing to dev"; fi'
                    }
                }
            }
        }
    }
}
