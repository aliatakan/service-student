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
                sh '''
                    echo registry=http://service-nexus.nexus.svc.cluster.local/repository/npm-group/ | tee .npmrc
                    echo _auth=bnBtdXNlcjoxMjM0NTc= | tee -a .npmrc
                    npm install
                '''
                //sh 'npm install' 
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
                    npm publish
                '''
            }
        }
    }
}