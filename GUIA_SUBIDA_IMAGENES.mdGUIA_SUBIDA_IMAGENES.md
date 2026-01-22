# Sistema de Subida de Imágenes a MinIO

## Descripción
Sistema implementado para subir imágenes de arqueos manuales a MinIO y guardar la URL en la base de datos.

## Componentes Implementados

### Backend

#### 1. Utilidad de Subida a MinIO (`server/src/utils/uploadMinIO.ts`)
- **uploadToMinIO**: Función que sube archivos a MinIO y retorna la URL pública
- **deleteFromMinIO**: Función para eliminar archivos de MinIO
- Genera nombres únicos usando UUID
- Maneja tipos MIME y validación de archivos

#### 2. Controlador Actualizado (`server/src/controllers/ArqueoManual.ts`)
- Procesa archivos con `multer`
- Sube la imagen a MinIO cuando se envía un archivo
- Guarda la URL en el campo `url_imagen` de la base de datos
- Maneja errores de subida

#### 3. Rutas Actualizadas (`server/src/routes/arqueo.routes.ts`)
- Configuración de `multer` con:
  - Almacenamiento en memoria
  - Límite de 5MB por archivo
  - Solo acepta archivos de imagen
- Middleware `upload.single('imagen')` en la ruta POST

### Frontend

#### 1. Componente de Formulario (`client/src/components/Arqueo/ArqueoManual/InserArqueoManual.tsx`)
- Estado para archivo seleccionado y preview
- Validación de tipo y tamaño de archivo (máx 5MB)
- Vista previa de imagen antes de subir
- Botón para eliminar imagen seleccionada
- Envío de FormData con archivo

#### 2. Servicio Actualizado (`client/src/Services/InsertArqueoMa.ts`)
- Crea FormData para enviar datos y archivo
- Configura headers para `multipart/form-data`
- Incluye todos los campos del arqueo manual

#### 3. Tabla de Visualización (`client/src/components/Arqueo/ArqueoManual/TableArqueoManual.tsx`)
- Columnas adicionales para todos los campos del arqueo
- Botón "Ver imagen" para abrir modal
- Modal full-screen para visualizar imágenes
- Botón de cierre del modal

#### 4. Tipo de Datos Actualizado (`client/src/types/arqueomanual.d.ts`)
- Todos los campos del arqueo manual incluidos
- Campo opcional `url_imagen`

## Configuración de MinIO

### Variables de Entorno (`.env`)
```env
MINIO_ENDPOINT=10.98.98.116
MINIO_PORT=9000
MINIO_ACCESS_KEY=admin
MINIO_SECRET_KEY=admin123456
MINIO_BUCKET=arqueo-imagenes
MINIO_USE_SSL=false
```

### Conexión MinIO (`server/src/connections/minio.ts`)
- Configuración del cliente MinIO
- Creación automática del bucket si no existe
- Configuración de política pública para lectura

## Flujo de Funcionamiento

### Subida de Imagen
1. Usuario selecciona una imagen en el formulario
2. Se muestra vista previa de la imagen
3. Al enviar el formulario:
   - Se crea un FormData con todos los campos
   - Se incluye el archivo de imagen
4. Backend recibe la petición:
   - Multer procesa el archivo
   - Se sube a MinIO con nombre único (UUID)
   - Se obtiene la URL pública
5. Se guarda en base de datos:
   - Todos los campos del arqueo
   - URL de la imagen en MinIO

### Visualización de Imagen
1. En la tabla se muestra botón "Ver imagen" si existe URL
2. Al hacer clic, se abre modal full-screen
3. Se muestra la imagen desde MinIO
4. Usuario puede cerrar el modal

## Validaciones Implementadas

### Frontend
- Solo archivos de imagen (image/*)
- Máximo 5MB por archivo
- Campos obligatorios validados

### Backend
- Multer valida tipo MIME (solo imágenes)
- Límite de 5MB configurado
- Manejo de errores en subida a MinIO

## Estructura de URL de Imágenes
```
http://[MINIO_ENDPOINT]:[MINIO_PORT]/[BUCKET_NAME]/[UUID].[extension]
```

Ejemplo:
```
http://10.98.98.116:9000/arqueo-imagenes/550e8400-e29b-41d4-a716-446655440000.jpg
```

## Dependencias Instaladas

### Backend
```json
{
  "multer": "^1.4.5-lts.1",
  "@types/multer": "^1.4.12",
  "uuid": "^9.0.1",
  "@types/uuid": "^9.0.8",
  "minio": "^7.1.3"
}
```

## Modelo de Base de Datos

```typescript
{
  id: number;
  puntodeventa: string;
  nombre: string;
  documento: string;
  ventabruta: string;
  totalingreso: string;
  efectivocajafuerte: string;
  sobrantefaltante: string;
  valor: string;
  url_imagen?: string;  // URL de MinIO
  fecha: Date;
}
```

## Uso

### Para Subir una Imagen
1. Ir al formulario de Arqueo Manual
2. Completar todos los campos requeridos
3. Hacer clic en el área de subida o arrastrar imagen
4. Verificar vista previa
5. Hacer clic en "Insertar Arqueo"
6. La imagen se subirá a MinIO y la URL se guardará automáticamente

### Para Ver una Imagen
1. Ir a la tabla de Arqueos Manuales
2. Buscar el registro deseado
3. Hacer clic en "Ver imagen" en la columna Imagen
4. Se abrirá un modal con la imagen en tamaño completo
5. Hacer clic fuera o en la X para cerrar

## Notas Importantes
- Las imágenes se almacenan en MinIO, no en la base de datos
- La base de datos solo guarda la URL de acceso
- MinIO está configurado con política pública para lectura
- Los nombres de archivo son únicos (UUID) para evitar colisiones
- El bucket se crea automáticamente si no existe al iniciar el servidor
