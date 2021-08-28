const { Sequelize } = require('sequelize');
const config = require('../config/config');

const {
  DB_USER, DB_PASSWORD, DB_PORT, DB_NAME, DB_HOST
} = config;

const connection = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
);

module.exports = connection;
