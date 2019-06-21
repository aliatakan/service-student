pipeline {
    agent any
    environment { 
        DOCKERHUB_CREDENTIALS = credentials('DOCKERHUB_USER_PASSWORD')
        APP_NAME = 'service-student'
        VERSION_NUMBER = '2.3.0'
    }
    options { buildDiscarder(logRotator(numToKeepStr: '3')) }
    stages {
        stage('Build') { 
            steps {
                sh '''
                    echo registry=https://nexus.kubernetes.softbased.com/repository/npm-group/ | tee .npmrc
                    echo _auth=bnBtdXNlcjoxMjM0NTc= | tee -a .npmrc
                    npm install                          
                '''
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
        stage ('Docker Build and Push') {
            steps {    
                // script {
                //     version_number = sh ''' 
                //         $(grep -m1 version package.json | awk -F: '{ print $2 }' | sed 's/[", ]//g')
                //     '''    
                // }
                
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub') {
                        docker.build("softbased/${APP_NAME}:${VERSION_NUMBER}").push()
                    }
                }
            }
        }
        stage('Remove Unused docker image') {
            steps{
                sh "docker rmi softbased/${APP_NAME}:${VERSION_NUMBER}"
            }
        }
    }
}