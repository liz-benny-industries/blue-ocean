const { DataTypes } = require('sequelize');

const donation = (sequelize) => sequelize.define('donation', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  location: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  charitiesOnly: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(
      'active',
      'canceled',
      'claimed',
      'delivered'
    ),
    defaultValue: 'active',
    allowNull: false,
  },
});

module.exports = donation;
