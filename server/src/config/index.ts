import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();
const envSchema = z.object({
  DB_SERVIRE_USE: z.string().min(2, 'El nombre de la base de datos es querida'),
  DB_SERVIRE_USER: z.string().min(2, 'El usuario de la base de datos es querida'),
  DB_SERVIRE_PASS: z.string().min(2, 'La contraseÃ±a de la base de datos es querida'),
  DB_SERVIRE_HOST: z.string().min(2, 'El host de la base de datos es querida'),
  DB_PORT: z.preprocess((val) => Number(val), z.number({
    message: 'El puerto de la base de datos debe ser un nÃºmero',
    required_error: 'el puerto de la base de datos es requerido',
  })),
})

const { success, data, error } = envSchema.safeParse(process.env);

if (!success) {
  console.error('Error en la configuraciÃ³n de las variables de entorno: ', error.format());
  process.exit(1);
}

export const {
  DB_SERVIRE_USE,
  DB_SERVIRE_USER,
  DB_SERVIRE_PASS,
  DB_SERVIRE_HOST,
  DB_PORT,
} = data;