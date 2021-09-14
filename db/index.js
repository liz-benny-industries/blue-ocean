const { Sequelize } = require('sequelize');
const { dbCreds } = require('../config/config');

const {
  user, password, port, name, host
} = dbCreds;

const connection = new Sequelize(
  `postgres://${user}:${password}@${host}:${port}/${name}`
);

module.exports = connection;
