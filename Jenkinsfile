pipeline {
    agent {
        label 'docker'
    }
    stages {
        stage('Docker Image') {
            steps {
                withEnv(["GITDESCRIBE=${sh(returnStdout: true, script: 'git describe | tr -d \'\n\'')}"]) {
                    sh 'docker build -t authentise/rapidfab:$GITDESCRIBE .'
                }
            }
        }
        stage('Docker container start') {
            steps {
                withEnv(["GITDESCRIBE=${sh(returnStdout: true, script: 'git describe | tr -d \'\n\'')}"]) {
                    sh 'docker run -d --name rapidfab --env BROWSER=PhantomJS2 -v $(pwd)/rapidfab:/src/rapidfab -v $(pwd)/tests:/src/tests -v $HOME/.aws:/root/.aws -d authentise/rapidfab:$GITDESCRIBE sleep infinity'
                    sh 'docker start rapidfab'
                }
            }
        }
        stage('Test') {
            steps {
                sh 'docker exec rapidfab npm run test:junit'
                sh 'docker exec rapidfab sh -c "npm run lint:js -- --fix --format checkstyle --output-file /src/eslintoutput.xml"'
                sh 'docker cp rapidfab:/src/eslintoutput.xml eslintoutput.xml'
                step([
                    $class            : 'CheckStylePublisher',
                    canRunOnFailed    : true,
                    defaultEncoding   : '',
                    healthy           : '100',
                    pattern           : '**/eslintoutput.xml',
                    unHealthy         : '90',
                    useStableBuildAsReference: true
                ])
            }
        }
        stage('Build') {
            steps {
                withEnv(["GITDESCRIBE=${sh(returnStdout: true, script: 'git describe | tr -d \'\n\'')}"]) {
                    withEnv(["DEV_COMMIT=${sh(returnStdout: true, script: 'echo $GITDESCRIBE | grep \'\\-g\' | cat')}"]) {
                        sh 'rm -Rf rapidfab-*.tgz'
                        sh 'if [ -z $DEV_COMMIT ]; then docker exec -e NODE_ENV=production rapidfab npm run build; else docker exec -e NODE_ENV=development rapidfab npm run build; fi'
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
            sh(returnStdout: true, script: 'docker exec rapidfab sh -c "rm -Rf node_modules test_results"')
            sh(returnStdout: true, script: 'docker stop rapidfab')
            sh(returnStdout: true, script: 'docker rm rapidfab')
            sh(returnStdout: true, script: 'rm -Rf $WORKSPACE/* $WORKSPACE/.git')
        }
    }
}
