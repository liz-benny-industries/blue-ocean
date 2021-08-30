const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('image', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
