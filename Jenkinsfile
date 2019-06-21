pipeline {
    agent any
    tools {nodejs "node"}
    environment { 
        DOCKERHUB_CREDENTIALS = credentials('DOCKERHUB_USER_PASSWORD')
        APP_NAME = 'service-student'
        VERSION_NUMBER = '2.3.0'
    }
    options { buildDiscarder(logRotator(numToKeepStr: '3')) }
    stages {
        stage('Build') { 
            steps {
                sh 'echo Build'
                sh 'sleep 20'
                // sh '''
                //     echo registry=https://nexus.kubernetes.softbased.com/repository/npm-group/ | tee .npmrc
                //     echo _auth=bnBtdXNlcjoxMjM0NTc= | tee -a .npmrc
                //     npm install                          
                // '''
            }
        }
        stage('Test') {
            steps {
                sh 'echo Test'
                sh 'sleep 33'
                //sh 'npm test'
            }
        }
        stage('Npm publish') { 
            steps {  
                sh 'echo publish'
                sh 'sleep 41'              
                // sh '''
                //     npm publish
                // '''
            }
        }
        stage ('Docker Build and Push') {
            steps {  
                sh 'sleep 17' 
                sh 'echo Docker build Push' 
                // script {
                //     docker.withRegistry('https://index.docker.io/v1/', 'dockerhub') {
                //         docker.build("softbased/${APP_NAME}:${VERSION_NUMBER}").push()
                //     }
                // }
            }
        }
        stage('Remove Unused docker image') {
            steps{
                sh 'echo Remove'
                //sh "docker rmi softbased/${APP_NAME}:${VERSION_NUMBER}"
            }
        }
        stage('Deploy to k8s') {
            steps {
                sh 'sleep 7'
                sh 'echo k8s'
                // sh "sed -i \"s/app_version/${version_number}/\" k8s.yaml"
                // sh "sed -i \"s/app_name/${app_name}/g\" k8s.yaml"
                // sh "kubectl apply -f k8s.yaml -n production"                               
            }
        }
    }
}