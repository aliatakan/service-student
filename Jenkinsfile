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
                    echo registry=https://nexus.kubernetes.softbased.com/repository/npm-group/ | tee .nmprc
                    echo _auth=bnBtdXNlcjoxMjM0NTc= | tee -a .npmrc
                    npm --registry http://nexus.kubernetes.softbased.com/repository/npm-group/ install
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