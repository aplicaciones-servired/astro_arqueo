import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const DB_BTNPERSONA_USER = process.env.DB_BTNPERSONA_USER as string;
const DB_BTNPERSONA_PASSWORD = process.env.DB_BTNPERSONA_PASSWORD as string;
const DB_BTNPERSONA_HOST = process.env.DB_BTNPERSONA_HOST as string;
const DB_BTNPERSONA_NAME = process.env.DB_BTNPERSONA_NAME as string;

const getPoolTBUsuario = new Sequelize(
  DB_BTNPERSONA_NAME,
  DB_BTNPERSONA_USER,
  DB_BTNPERSONA_PASSWORD,
  {
    host: DB_BTNPERSONA_HOST,
    dialect: "mysql",
    timezone: "-05:00",
  }
);

export { getPoolTBUsuario };
