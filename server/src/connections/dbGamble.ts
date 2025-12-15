import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const DB_INFO_USER = process.env.DB_INFO_HOST as string
const DB_INFO_PASSWORD = process.env.DB_INFO_PASSWORD as string
const DB_INFO_USER_NAME = process.env.DB_INFO_USER as string
const DB_INFO_NAME = process.env.DB_INFO_NAME as string

const getPoolGamble = new Sequelize(DB_INFO_NAME, DB_INFO_USER_NAME, DB_INFO_PASSWORD, {
  host: DB_INFO_USER,
  dialect: "mysql",
  timezone: '-05:00',
});

export { getPoolGamble };
