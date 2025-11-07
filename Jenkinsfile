pipeline {
  agent any

  tools {
    nodejs 'node-v22'
  }

  environment {
    ENV_CLIENT_ARQUEOS = credentials('ENV_CLIENT_ARQUEOS')
    ENV_SERVER_ARQUEOS = credentials('ENV_SERVER_ARQUEOS')
    AUTH_SECRET = credentials('AUTH_SECRET') // ⚡ Agregar el secret para auth
  }

  stages {
    stage('Copy .env files') {
      steps {
        script {
          def env_server = readFile(ENV_SERVER_ARQUEOS)
          def env_client = readFile(ENV_CLIENT_ARQUEOS)
          writeFile file: './server/.env', text: env_server
          writeFile file: './client/.env', text: env_client
        }
      }
    }

    stage('Install dependencies server') {
      steps {
        dir('server') {
          sh 'npm install'
        }
      }
    }

    stage('Install & build client') {
      steps {
        dir('client') {
          withEnv([
            "VITE_API_URL_LOGIN=${ENV_CLIENT_ARQUEOS}",
            "VITE_URL_API=${ENV_SERVER_ARQUEOS}",
            "AUTH_SECRET=${AUTH_SECRET}"
          ]) {
            sh 'npm install --legacy-peer-deps'
            sh 'npm run build'
          }
        }
      }
    }

    stage('Down Docker Compose') {
      steps {
        script {
          sh 'docker compose down || echo "No docker compose to down"'
        }
      }
    }

    stage('Delete server images') {
      steps {
        script {
          def images = 'arqueo-server'
          def imageId = sh(script: "docker images -q ${images}", returnStdout: true).trim()
          if (imageId) {
            sh "docker rmi ${imageId}"
          } else {
            echo "Image ${images} does not exist, skipping."
          }
        }
      }
    }

    stage('Run Docker Compose') {
      steps {
        script {
          sh 'docker compose up -d'
        }
      }
    }
  }
}
