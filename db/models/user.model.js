const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('user', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    // autoIncrement: true,
    allowNull: false,
  },
  is_individual: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  default_location: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  google_id: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});
