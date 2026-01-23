import multer from "multer";

export const confirmupload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024, // Límite de 20MB 
  },
  fileFilter: (req, file, cb) => {
    // Aceptar imágenes y PDFs
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos de imagen (PNG, JPG, GIF) o PDF'));
    }
  }
});