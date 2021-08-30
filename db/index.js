const { Sequelize } = require('sequelize');
require('dotenv').config();

const {
  DB_USER, DB_PASSWORD, DB_PORT, DB_NAME, DB_HOST
} = process.env;

const connection = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
);

module.exports = connection;
