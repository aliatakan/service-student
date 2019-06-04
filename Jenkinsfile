pipeline {
    agent {
        docker {
            image 'node:6-alpine' 
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
    }
}