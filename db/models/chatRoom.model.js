const { DataTypes } = require('sequelize');
const donation = require('./donation.model');
const user = require('./user.model');

const chatRoom = (sequelize) => sequelize.define('chatRoom', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false,
  },
});

// chatRoom.hasOne(donation);
// chatRoom.BelongsToMany(user);
// user.hasMany(chatRoom);

module.exports = chatRoom;
