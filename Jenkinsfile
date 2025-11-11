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
          // REMOVER esta línea: sh 'cd ./client && node --run build'
          // El build se hace en el Dockerfile, no aquí
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

    stage('delete images') {
      steps {
        script {
          // Eliminar ambas imágenes para forzar rebuild
          def images = ['arqueo-server', 'web-arqueo']
          images.each { image ->
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
        script {
          // Forzar rebuild de todas las imágenes
          sh 'docker compose build --no-cache'
          sh 'docker compose up -d'
        }
      }
    }

    stage('verify services') {
      steps {
        script {
          sleep(30) // Esperar que los servicios estén listos
          // Verificar que los contenedores estén corriendo
          sh 'docker ps'
          // Verificar que web_arqueo escucha en el puerto correcto
          sh '''
            docker exec web_arqueo netstat -tlnp | grep 4321 || echo "Puerto 4321 no encontrado"
            docker exec nginx_proxy wget -q -O- http://web_arqueo:4321 > /dev/null && echo "Conexión exitosa" || echo "Error de conexión"
          '''
        }
      }
    }
  }
}