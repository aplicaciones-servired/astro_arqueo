pipeline {
  agent any
    
  tools {
    nodejs 'node-v22'
  }

  environment {
    ENV_CLIENT_ARQUEOS = credentials('ENV_CLIENT_ARQUEOS')
    ENV_SERVER_ARQUEOS = credentials('ENV_SERVER_ARQUEOS')
    CLERK_SECRET_KEY = credentials('CLERK_SECRET_KEY')  // ✅ NUEVA CREDENCIAL
  }
    
  stages {
    stage('Copy .env files') {
      steps {
        script {
          def env_server = readFile(ENV_SERVER_ARQUEOS)
          def env_client = readFile(ENV_CLIENT_ARQUEOS)
          writeFile file: './server/.env', text: env_server
          writeFile file: './client/.env', text: env_client
          
          // ✅ CREAR ARCHIVO .env para nginx con la clave de Clerk
          writeFile file: './.env', text: "CLERK_SECRET_KEY=${CLERK_SECRET_KEY}"
          
          // Verificar que se crearon los archivos
          sh 'ls -la ./server/.env'
          sh 'ls -la ./client/.env'
          sh 'ls -la ./.env'
          sh 'cat ./client/.env | grep PUBLIC_URL_API'
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
          sh 'cd ./client && node --run build'
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
            echo "continuing... executing next steps"
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
            echo "continuing... executing next steps"
          }
        }
      }
    }
    
    stage('run docker compose') {
      steps {
        script {
          // ✅ Usar el archivo .env con la clave de Clerk
          sh 'docker compose --env-file ./.env up -d'
        }
      }
    }
  }
}