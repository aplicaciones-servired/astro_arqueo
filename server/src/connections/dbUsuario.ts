import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const DB_USUARIO_HOST = process.env.DB_USUARIO_HOST as string
const DB_USUARIO_PASSWORD = process.env.DB_USUARIO_PASSWORD as string
const DB_USUARIO_USER = process.env.DB_USUARIO_USER as string
const DB_USUARIO_NAME = process.env.DB_USUARIO_NAME as string
const DB_DIALECT_USUARIO = process.env.DB_DIALECT_USUARIO as string

const getPoolUsuario = new Sequelize(DB_USUARIO_NAME, DB_USUARIO_USER, DB_USUARIO_PASSWORD, {
  host: DB_USUARIO_HOST,
  dialect: "mysql",
  timezone: '-05:00',
});

export { getPoolUsuario };
