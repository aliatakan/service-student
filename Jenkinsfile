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
                //echo registry=http://nexus.kubernetes.softbased.com/repository/npm-group/ | tee .npmrc
                //echo _auth=bnBtdXNlcjoxMjM0NTc | tee -a .npmrc
                sh '''
                    echo registry=http://nexus.kubernetes.softbased.com/repository/npm-group/_authToken=NpmToken.bnBtdXNlcjoxMjM0NTc | tee .npmrc
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