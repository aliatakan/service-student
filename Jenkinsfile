pipeline {
    agent {
        docker {
            image 'node:lts-alpine' 
            args '-p 3001:3000' 
        }
    }
    environment { 
        def app_name = 'service-student'
        //def version_number = process.env['BUILD_NUMBER']
        def version_number = ''
    }
    options { buildDiscarder(logRotator(numToKeepStr: '3')) }
    stages {
        stage('Build') { 
            steps {
                //echo registry=http://nexus.kubernetes.softbased.com/repository/npm-group/ | tee .npmrc
                //echo _auth=bnBtdXNlcjoxMjM0NTc | tee -a .npmrc
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
                script {
                    version_number = $(grep -m1 version package.json | awk -F: '{ print $2 }' | sed 's/[", ]//g')

                    docker.withRegistry('https://nexus.kubernetes.softbased.com/repository/docker-private/', 'nexus') {
                        docker.build("softbased/${app_name}:${version_number}").push()
                    }
                }
            }
        }
        stage('Remove Unused docker image') {
            steps{
                sh "docker rmi softbased/${app_name}:${version_number}"
            }
        }
    }
}