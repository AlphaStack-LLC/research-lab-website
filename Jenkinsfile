// =============================================================================
// AlphaStack Research Lab — Static Site Pipeline
// =============================================================================
// Next.js static export -> S3 (private, via OAC) -> CloudFront
// Differs from the ECS template: no Docker image is built; the site is a
// static artifact uploaded to S3 and served through CloudFront.
// =============================================================================

pipeline {
    agent any

    environment {
        SERVICE_NAME    = 'research-lab-website'
        AWS_REGION      = 'us-east-1'
        S3_BUCKET       = 'alpha-stack-lab-website'              // private bucket, OAC only
        CLOUDFRONT_DISTRIBUTION_ID = 'EXXXXXXXXXXXX'             // set per environment
        NODE_VERSION    = '24'
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '20'))
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

    stages {
        // -------------------------------------------------------------------
        // Stage 1: Checkout
        // -------------------------------------------------------------------
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // -------------------------------------------------------------------
        // Stage 2: Install & Lint
        // -------------------------------------------------------------------
        stage('Install & Lint') {
            steps {
                sh '''
                    echo "==> Installing dependencies..."
                    npm ci --no-audit

                    echo "==> Running linter..."
                    npm run lint
                '''
            }
        }

        // -------------------------------------------------------------------
        // Stage 3: Typecheck
        // -------------------------------------------------------------------
        stage('Typecheck') {
            steps {
                sh 'npm run typecheck'
            }
        }

        // -------------------------------------------------------------------
        // Stage 4: Build & Test static export
        // -------------------------------------------------------------------
        stage('Build & Test') {
            steps {
                sh '''
                    echo "==> Building static export..."
                    npm run build

                    echo "==> Running smoke tests against out/..."
                    npm test
                '''
            }
        }

        // -------------------------------------------------------------------
        // Stage 5: Deploy to S3 + CloudFront invalidation
        // -------------------------------------------------------------------
        stage('Deploy') {
            when {
                anyOf {
                    branch 'main'
                    branch 'master'
                }
            }
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-credentials']]) {
                    sh 'npm run deploy'
                }
            }
        }
    }

    post {
        always {
            deleteDir()
        }
    }
}
