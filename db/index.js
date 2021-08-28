// Create connection and export
import { Sequelize } from 'sequelize';
import config from './config';

const {
  DB_USER, DB_PASSWORD, DB_PORT, DB_NAME, DB_HOST
} = config;

export default new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
);
