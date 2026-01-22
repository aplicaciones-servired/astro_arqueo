import { minioClient, BUCKET_NAME } from '../connections/minio';
import { v4 as uuidv4 } from 'uuid';

/**
 * Sube un archivo a MinIO y retorna la URL pública
 * @param file - Buffer del archivo
 * @param originalName - Nombre original del archivo
 * @param mimetype - Tipo MIME del archivo
 * @returns URL pública del archivo en MinIO
 */
export const uploadToMinIO = async (
  file: Buffer,
  originalName: string,
  mimetype: string
): Promise<string> => {
  try {
    // Generar nombre único para el archivo
    const fileExtension = originalName.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    
    // Subir archivo a MinIO
    await minioClient.putObject(
      BUCKET_NAME,
      fileName,
      file,
      file.length,
      {
        'Content-Type': mimetype,
      }
    );

    // Construir URL pública del archivo
    const minioEndpoint = process.env.MINIO_ENDPOINT;
    const minioPort = process.env.MINIO_PORT;
    const url = `http://${minioEndpoint}:${minioPort}/${BUCKET_NAME}/${fileName}`;

    console.log(`✅ Archivo subido a MinIO: ${url}`);
    return url;
  } catch (error) {
    console.error('❌ Error al subir archivo a MinIO:', error);
    throw new Error('Error al subir archivo a MinIO');
  }
};

/**
 * Elimina un archivo de MinIO dado su URL
 * @param url - URL del archivo en MinIO
 */
export const deleteFromMinIO = async (url: string): Promise<void> => {
  try {
    // Extraer nombre del archivo de la URL
    const fileName = url.split('/').pop();
    if (!fileName) {
      throw new Error('URL inválida');
    }

    await minioClient.removeObject(BUCKET_NAME, fileName);
    console.log(`✅ Archivo eliminado de MinIO: ${fileName}`);
  } catch (error) {
    console.error('❌ Error al eliminar archivo de MinIO:', error);
    throw new Error('Error al eliminar archivo de MinIO');
  }
};
