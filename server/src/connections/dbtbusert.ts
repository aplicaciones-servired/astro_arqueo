import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const DB_BTNPERSONA_USER = process.env.DB_BTNPERSONA_USER as string;
const DB_BTNPERSONA_PASSWORD = process.env.DB_BTNPERSONA_PASSWORD as string;
const DB_BTNPERSONA_HOST = process.env.DB_BTNPERSONA_HOST as string;
const DB_BTNPERSONA_NAME = process.env.DB_BTNPERSONA_NAME as string;
const DB_BTNPERSONA_PORT = Number(process.env.DB_BTNPERSONA_PORT || 3306);

const getPoolTBUsuario = new Sequelize(
  DB_BTNPERSONA_NAME,
  DB_BTNPERSONA_USER,
  DB_BTNPERSONA_PASSWORD,
  {
    host: DB_BTNPERSONA_HOST,
    port: DB_BTNPERSONA_PORT,
    dialect: "mysql",
    timezone: "-05:00",
    dialectOptions: { connectTimeout: 10000 },
  }
);

export { getPoolTBUsuario };
