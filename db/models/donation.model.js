const { DataTypes } = require('sequelize');

const donation = (sequelize) => sequelize.define('donation', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false,
  },
  location: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
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
    allowNull: false,
  },
});

module.exports = donation;
