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
            npm ci || npm install
          '''
        }
      }
    }

    stage('Install dependencies client') {
      steps {
        script {
          sh '''
            cd ./client
            npm ci || npm install --legacy-peer-deps
            # 🔹 Evita errores de TypeScript en node_modules
            npm run build -- --skipLibCheck
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
          def image = 'arqueo-server'
          if (sh(script: "docker images -q ${image}", returnStdout: true).trim()) {
            sh "docker rmi ${image}"
          } else {
            echo "Image ${image} does not exist. Continuing..."
          }
        }
      }
    }

    stage('Run docker compose') {
      steps {
        script {
          sh 'docker compose up -d --build'
        }
      }
    }
  }
}
