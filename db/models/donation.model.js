const { DataTypes } = require('sequelize');
const User = require('./user.model');

// https://stackoverflow.com/questions/43523203/two-foreign-key-of-same-table-in-one-table-in-sequelize

const Donation = (sequelize) => sequelize.define('Donation', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    // autoIncrement: true,
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
  // donor_id: {
  //   type: DataTypes.UUID,
  //   references: User, // if breaks, refactor per image model
  //   referencesKey: 'id',
  // },
  // claimant_id: {
  //   type: DataTypes.UUID,
  //   references: User,
  //   referencesKey: 'id',
  // },
});

// Donation.hasMany(User);
// Donation.hasOne(User, { as: 'claimant_id', foreignKey: 'id' });
// Donation.hasOne(User, { as: 'donor_id', foreignKey: 'id' });

module.exports = Donation;
