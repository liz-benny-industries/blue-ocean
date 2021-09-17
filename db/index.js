const { Sequelize } = require('sequelize');
const { dbCreds } = require('../server/config');

const {
  user, password, port, name, host
} = dbCreds;

const connection = new Sequelize(
  `postgres://${user}:${password}@${host}:${port}/${name}`,
  {
    logging: false,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }
);

module.exports = connection;
