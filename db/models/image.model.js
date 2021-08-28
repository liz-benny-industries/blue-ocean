const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('image', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
