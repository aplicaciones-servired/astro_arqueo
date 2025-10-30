import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const DB_ARQUEO_HOST = process.env.DB_SERVIRED_HOST as string
const DB_ARQUEO_PASSWORD = process.env.DB_SERVIRED_PASS as string
const DB_ARQUEO_USER = process.env.DB_SERVIRED_USER as string
const DB_ARQUEO_NAME = process.env.DB_SERVIRED_USE as string
const DB_DIALECT_ARQUEO = process.env.DB_DIALECT_ARQUEO as string

const getPoolArqueo = new Sequelize(DB_ARQUEO_NAME, DB_ARQUEO_USER, DB_ARQUEO_PASSWORD, {
  host: DB_ARQUEO_HOST,
  dialect: "mysql",
  timezone: '-05:00',
});

export { getPoolArqueo };
