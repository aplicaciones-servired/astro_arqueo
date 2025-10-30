import { DB_SERVIRE_HOST, DB_SERVIRE_USE, DB_SERVIRE_PASS, DB_PORT, DB_SERVIRE_USER } from '../config/index';
import { Sequelize } from 'sequelize';

console.log({
  DB_SERVIRE_USER,
  DB_SERVIRE_PASS,
  DB_SERVIRE_HOST,
  DB_SERVIRE_USE,
  DB_PORT
});

const getPoolLogin = new Sequelize(DB_SERVIRE_USE, DB_SERVIRE_USER, DB_SERVIRE_PASS, {
  host: DB_SERVIRE_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  timezone: '-05:00',
  logging: false
});

export { getPoolLogin }



