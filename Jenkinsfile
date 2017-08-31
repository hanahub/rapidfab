pipeline {
    agent {
        label 'docker'
    }
    stages {
        stage('Docker Image') {
            when {
                expression {
                    sh(returnStdout: true, script: 'docker ps -a -q -f "name=rapidfab"').trim() == ''
                }
            }
            steps {
                withEnv(["GITDESCRIBE=${sh(returnStdout: true, script: 'git describe | tr -d \'\n\'')}"]) {
                    sh 'docker build -t authentise/mes:$GITDESCRIBE .'
                    sh 'docker run -d --name rapidfab --env BROWSER=PhantomJS2 -v $(pwd):/src -v $HOME/.aws:/root/.aws -d authentise/mes:$GITDESCRIBE sleep infinity'
                    sh 'docker exec rapidfab npm install'
                    sh 'docker exec rapidfab npm prune'
                    sh 'docker exec rapidfab npm run build:clean'
                }
            }
        }
        stage('Docker container start') {
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
                withEnv(["GITDESCRIBE=${sh(returnStdout: true, script: 'git describe | tr -d \'\n\'')}"]) {
                    withEnv(["DEV_COMMIT=${sh(returnStdout: true, script: 'echo $GITDESCRIBE | grep \'\\-g\' | cat')}"]) {
                        sh 'rm -Rf dist/*'
                        sh 'mkdir -p dist'
                        sh 'rm -Rf rapidfab-*.tgz'
                        sh 'if [ -z $DEV_COMMIT ]; then docker exec -e NODE_ENV=production rapidfab npm run build; else docker exec -e NODE_ENV=development rapidfab npm run build; fi'
                        sh 'docker exec rapidfab chmod -f a+rw -R /src/dist'
                        sh 'tar -czvf rapidfab-$GITDESCRIBE.tgz dist'
                        archiveArtifacts artifacts: 'rapidfab-*.tgz', fingerprint: true
                    }
                }
            }
        }
        stage('Publish') {
            when {
                branch 'master'
            }
            steps {
                withEnv(["GITDESCRIBE=${sh(returnStdout: true, script: 'git describe | tr -d \'\n\'')}"]) {
                    withEnv(["DEV_COMMIT=${sh(returnStdout: true, script: 'echo $GITDESCRIBE | grep \'\\-g\' | cat')}"]) {
                        sh 'if [ -z $DEV_COMMIT ]; then docker exec rapidfab npm run publish -- --region us-west-2 --bucket rapidfab.authentise.com --cloudfront EOPZ6L10IQ06S; else docker exec rapidfab npm run publish -- --region us-west-2 --bucket rapidfab.dev-auth.com --cloudfront E204AX3Y5WR2B4; fi'
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
