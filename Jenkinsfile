pipeline {
  agent any
    
  tools {
    nodejs 'node-v22'
  }

  environment {
    ENV_CLIENT_ARQUEOS = credentials('ENV_CLIENT_ARQUEOS')
    ENV_SERVER_ARQUEOS = credentials('ENV_SERVER_ARQUEOS')
    CLERK_SECRET_KEY   = credentials('CLERK_SECRET_KEY')
  }
    
  stages {

    stage('Copy .env files') {
      steps {
        script {
          def env_server = readFile(ENV_SERVER_ARQUEOS)
          def env_client = readFile(ENV_CLIENT_ARQUEOS)
          
          // Añadir clave Clerk al env del cliente
          def env_client_completo = env_client + "\nCLERK_SECRET_KEY=${CLERK_SECRET_KEY}\n"
          
          writeFile file: './server/.env', text: env_server
          writeFile file: './client/.env', text: env_client_completo
          
          // Verificar
          sh 'ls -la ./server/.env'
          sh 'ls -la ./client/.env'
          sh 'cat ./client/.env | grep PUBLIC_URL_API'
          sh 'cat ./client/.env | grep CLERK_SECRET_KEY'
        }
      }
    }

    stage('install dependencies server') {
      steps {
        script {
          sh 'cd ./server && npm install'
        }
      }
    }

    stage('install dependencies client') {
      steps {
        script {
          sh 'cd ./client && npm install --legacy-peer-deps'
          sh 'cd ./client && npm run build'
        }
      }
    }

    stage('down docker compose') {
      steps {
        script {
          sh 'docker compose down'
        }
      }
    }

    stage('delete images client') {
      steps {
        script {
          def images = 'web-arqueo'
          if (sh(script: "docker images -q ${images}", returnStdout: true).trim()) {
            sh "docker rmi ${images}"
          } else {
            echo "Image ${images} does not exist."
          }
        }
      }
    }

    stage('delete images server') {
      steps {
        script {
          def images = 'arqueo-server'
          if (sh(script: "docker images -q ${images}", returnStdout: true).trim()) {
            sh "docker rmi ${images}"
          } else {
            echo "Image ${images} does not exist."
          }
        }
      }
    }
    
    stage('run docker compose') {
      steps {
        script {
          // ❌ Ya no usamos --env-file porque no existe un .env global
          // ✅ docker-compose cargará automáticamente server/.env y client/.env
          sh 'docker compose up -d'
        }
      }
    }
  }
}
