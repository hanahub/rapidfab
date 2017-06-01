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
        }
        stage('Publish Dev') {
            when {
                branch 'master'
            }
            steps {
                withEnv(["GITDESCRIBE=${sh(returnStdout: true, script: 'git describe | tr -d \'\n\'')}"]) {
                    if ($GITDESCRIBE.indexOf('-g') > 0) {
                        sh 'docker exec rapidfab -v $(pwd):/src -v $HOME/.aws:/root/.aws npm run publish -- --region us-west-2 --bucket rapidfab.dev-auth.com --cloudfront E204AX3Y5WR2B4'
                    } else {
                        sh 'docker exec rapidfab -v $(pwd):/src -v $HOME/.aws:/root/.aws npm run publish -- --region us-west-2 --bucket rapidfab.authentise.com --cloudfront EOPZ6L10IQ06S'
                    }
                }
            }
        }
    }
}
