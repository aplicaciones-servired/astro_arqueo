pipeline {
  agent any

  tools {
    nodejs 'node-v22'
  }

  environment {
    ENV_CLIENT_ARQUEOS = credentials('ENV_CLIENT_ARQUEOS')
    ENV_SERVER_ARQUEOS = credentials('ENV_SERVER_ARQUEOS')
  }

  stages {

    stage('Copy .env files') {
      steps {
        script {
          def env_server = readFile(ENV_SERVER_ARQUEOS)
          def env_client = readFile(ENV_CLIENT_ARQUEOS)

          // Copiar .env del server
          writeFile file: './server/.env', text: env_server

          // Copiar .env del cliente
          writeFile file: './client/.env', text: env_client

          // 🔥 IMPORTANTE: Exportar variables del cliente a la raíz
          writeFile file: './.env', text: env_client
        }
      }
    }

    stage('install dependencies server') {
      steps {
        sh 'cd ./server && npm install'
      }
    }

    stage('install dependencies client') {
      steps {
        sh 'cd ./client && npm install --legacy-peer-deps'
      }
    }

    stage('down docker compose') {
      steps {
        sh 'docker compose down'
      }
    }

    stage('delete images') {
      steps {
        script {
          ['arqueo-server', 'web-arqueo'].each { image ->
            if (sh(script: "docker images -q ${image}", returnStdout: true).trim()) {
              sh "docker rmi -f ${image}"
            } else {
              echo "Image ${image} does not exist."
            }
          }
        }
      }
    }

    stage('build and run docker compose') {
      steps {
        sh 'docker compose build --no-cache'
        sh 'docker compose up -d'
      }
    }
  }
}
