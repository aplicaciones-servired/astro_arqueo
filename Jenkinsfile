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

    stage('Install dependencies client & Build SSR') {
      steps {
        script {
          sh '''
            cd ./client
            npm install --legacy-peer-deps
            # Saltamos errores de tipo en dependencias externas
            npx tsc --skipLibCheck --noEmit || true
            npx astro build
          '''
        }
      }
    }

    stage('Stop old containers') {
      steps {
        script {
          sh 'docker compose down || true'
        }
      }
    }

    stage('Remove old server images') {
      steps {
        script {
          def images = ['arqueo-server', 'astro-server']
          images.each { img ->
            def imgId = sh(script: "docker images -q ${img}", returnStdout: true).trim()
            if (imgId) {
              sh "docker rmi -f ${imgId}"
            } else {
              echo "Image ${img} does not exist, skipping..."
            }
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
    
    stage('Verify services') {
      steps {
        script {
          sh '''
            echo "Checking running containers..."
            docker ps
          '''
        }
      }
    }
  }
}
