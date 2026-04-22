import multer from "multer";

export const confirmupload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // Limite de 50MB
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