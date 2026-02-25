import { Client } from 'minio';
import dotenv from 'dotenv';

dotenv.config();

export const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT as string,
  port: Number(process.env.MINIO_PORT),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY as string,
  secretKey: process.env.MINIO_SECRET_KEY as string
});

export const BUCKET_NAME = process.env.MINIO_BUCKET || 'inventario-imagenes';

// Origen público accesible desde el navegador (puede diferir del endPoint interno Docker)
// Usar MINIO_PUBLIC_ENDPOINT + MINIO_PUBLIC_PORT si se define; si no, usar MINIO_ENDPOINT + MINIO_PORT
const publicHost = process.env.MINIO_PUBLIC_ENDPOINT || process.env.MINIO_ENDPOINT || 'localhost';
const publicPort = process.env.MINIO_PUBLIC_PORT || process.env.MINIO_PORT || '9000';
export const MINIO_PUBLIC_ORIGIN = `http://${publicHost}:${publicPort}`;

// Verificar conexión y crear bucket si no existe
(async () => {
  try {
    const exists = await minioClient.bucketExists(BUCKET_NAME);
    
    if (!exists) {
      await minioClient.makeBucket(BUCKET_NAME, 'us-east-1');
      console.log(`✅ Bucket "${BUCKET_NAME}" creado en MinIO`);
    } else {
      console.log(`✅ Conectado a MinIO - Bucket: ${BUCKET_NAME}`);
    }
    
    // Configurar política pública para lectura (siempre)
    const policy = {
      Version: '2012-10-17',
      Statement: [{
        Effect: 'Allow',
        Principal: { AWS: ['*'] },
        Action: ['s3:GetObject'],
        Resource: [`arn:aws:s3:::${BUCKET_NAME}/*`]
      }]
    };
    
    await minioClient.setBucketPolicy(BUCKET_NAME, JSON.stringify(policy));
    console.log(`✅ Política pública configurada para bucket: ${BUCKET_NAME}`);
    
  } catch (err: any) {
    console.error('❌ Error conectando a MinIO:', err.message);
  }
})();
