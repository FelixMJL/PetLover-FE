pipeline {
    agent any
    
   
    parameters {
        text(name: 'CLOUDFRONT_DISTRIBUTION_ID', 
        defaultValue: 'E1UUFYUGMCHH3U', 
        description: 'only modify these when destroy and apply new tf frontend resources')
    }

    environment{
        AWS_CRED        = 'AWS' 
        AWS_REGION      = 'ap-southeast-2'
        S3_BUCKET       = 'petlover-front-uat'
    }

    stages{
        stage('Install dependency')
        {
            steps{
             echo "Installing packages"
             sh 'npm install'
            }          
        }

        stage('npm build') 
        {
            steps{
             echo "Building compressed files..."
             sh " npm run build"
             sh 'ls -la ./build'
            }
        } 

        stage("upload  to  S3 bucket and revalidate CDN Cache") {
            // develop
            // when {branch 'Suree/DevOps'}   
            steps {
                withAWS(credentials: AWS_CRED, region: AWS_REGION){
                    dir('./build') {
                        echo "deploy static files to S3"
                        sh "aws s3 sync . s3://${S3_BUCKET} --delete"
                        sh "aws cloudfront create-invalidation --distribution-id ${params.CLOUDFRONT_DISTRIBUTION_ID} --paths '/*'"
                    }
                }
            }
        }
    }

    post {

        failure {
            // send message it was failsure
            slackSend channel: 'pet-lover',
            message: "Frontend UAT build, Number ${BUILD_NUMBER} failed!"
            emailext(attachLog: true, body: '看测试结果啦', subject: "Frontend UAT build FAILD", to: 'jadesure17@gmail.com')
            echo "uhm... 我觉得不太行！"
        }

        success {
            // send message it was success
            slackSend channel: 'pet-lover', 
            message: "Frontend UAT build, Number ${BUILD_NUMBER} succeeded!"
            emailext(attachLog: true, body: '看测试结果啦', subject: 'Frontend UAT build SUCCESSED', to: 'jadesure17@gmail.com')
            echo "老铁！恭喜你，成功了呀!"
        }

        always {
            script {
                try{
                    sh'''
                        cleanWs()
                    '''
                } catch (Exception e) {
                    echo "clean failed"
                }
            }
        }
    }
}