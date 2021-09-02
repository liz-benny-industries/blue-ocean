const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('distance', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  distance: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
