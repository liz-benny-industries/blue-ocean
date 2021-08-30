const { Sequelize } = require('sequelize');
// const config = require('../config/config');
require('dotenv').config();

const connection = new Sequelize(
  `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
);

module.exports = connection;
