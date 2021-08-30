const { DataTypes } = require('sequelize');

const Notification = (sequelize) => sequelize.define('notification', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  viewed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

// TODO: add to configureRelations User.hasMany(Notification);
// TODO: add to configureRelations Notification.belongsToMany(User);
// TODO: add to configureRelations Notification.hasOne(Donation);

module.exports = Notification;
