pipeline {
    agent {
        docker {
            image 'node:lts-alpine' 
            args '-p 3001:3000' 
        }
    }
    environment {
        CI = 'true' 
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Npm publish') { 
            steps {
                sh '''
                    registry=http://nexus.kubernetes.softbased.com/repository/npm-group/_auth=bnBtdXNlcjoxMjM0NTc=
                    npm publish
                '''
            }
        }
    }
}