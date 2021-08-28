const { DataTypes } = require('sequelize');

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
});

// User.hasMany(Notification);
// Notification.belongsToMany(User);
// Notification.hasOne(Donation);

module.exports = Notification;
