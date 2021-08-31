const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('user', {
  id: {
    primaryKey: true,
    type: DataTypes.TEXT,
    allowNull: false,
  },
  isIndividual: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  defaultLocation: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
