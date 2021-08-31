const { DataTypes } = require('sequelize');

module.exports = (sequelize) => sequelize.define('user', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4, // TODO: Replace with FirebaseUID
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
  googleId: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
