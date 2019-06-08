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
                    cat <<EOF > .npmrc
                        registry=http://nexus.kubernetes.softbased.com/repository/npm-group/
                        _auth=bnBtdXNlcjoxMjM0NTc=
                    EOF                
                '''
                sh 'npm install' 
                sh 'sleep 300'
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