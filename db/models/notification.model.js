const { DataTypes } = require('sequelize');
// const user = require('./user.model');
// const donation = require('./user.model');

const Notification = (sequelize) => sequelize.define('notification', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false,
  },
  viewed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  // claimant_id: {
  //   type: DataTypes.UUID,
  //   references: {
  //     model: User,
  //     key: 'id',
  //   },
  // },
  // donor_id: {
  //   type: DataTypes.UUID,
  //   references: {
  //     model: User,
  //     key: 'id',
  //   },
  // },
  // donation_id: {
  //   type: DataTypes.UUID,
  //   references: {
  //     model: Donation,
  //     key: 'id',
  //   },
  // },
});

// User.hasMany(Notification);
// Notification.belongsToMany(User);
// Notification.hasOne(Donation);

module.exports = Notification;
