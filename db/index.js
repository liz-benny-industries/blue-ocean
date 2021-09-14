const { Sequelize } = require('sequelize');
const { dbCreds } = require('../server/config/config');

const {
  user, password, port, name, host
} = dbCreds;

const connection = new Sequelize(
  `postgres://${user}:${password}@${host}:${port}/${name}`,
  { logging: false }
);

module.exports = connection;
