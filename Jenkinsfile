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
          writeFile file: './server/.env', text: env_server
          writeFile file: './client/.env', text: env_client
        }
      }
    }

    stage('Install dependencies server') {
      steps {
        script {
          sh '''
            cd ./server
            npm install --legacy-peer-deps
          '''
        }
      }
    }

    stage('Install dependencies client & Build') {
      steps {
        script {
          sh '''
            cd ./client
            npm install --legacy-peer-deps
            # 🔹 Saltamos errores de tipo en dependencias externas
            npx tsc --skipLibCheck
            npx astro build
          '''
        }
      }
    }

    stage('Down docker compose') {
      steps {
        script {
          sh 'docker compose down || true'
        }
      }
    }

    stage('Delete old server images') {
      steps {
        script {
          def images = 'arqueo-server'
          if (sh(script: "docker images -q ${images}", returnStdout: true).trim()) {
            sh "docker rmi ${images}"
          } else {
            echo "Image ${images} does not exist, continuing..."
          }
        }
      }
    }
    
    stage('Run docker compose') {
      steps {
        script {
          sh 'docker compose up -d'
        }
      }
    }
  }
}
