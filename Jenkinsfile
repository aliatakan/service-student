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
                sh "echo \"//npm.dev.btek/:username=npmuser\" >> ~/.npmrc"
	
                sh "echo \"//npm.dev.btek/:_password=MTIzNDU3==\" > ~/.npmrc"
                
                sh "echo \"//npm.dev.btek/:email=aliatakan@gmail.com\" >> ~/.npmrc"
                        
                sh "echo \"//npm.dev.btek/:always-auth=true\" >> ~/.npmrc"
                        
                sh "npm set registry https://nexus.kubernetes.softbased.com/repository/npm-group/"

                sh "npm publish"
                
                /*sh '''
                    echo registry=https://nexus.kubernetes.softbased.com/repository/npm-group/ | tee .nmprc
                    echo _auth=bnBtdXNlcjoxMjM0NTc= | tee -a .npmrc
                    npm publish
                '''*/
            }
        }
    }
}