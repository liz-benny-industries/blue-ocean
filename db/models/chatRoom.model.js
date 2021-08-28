const { DataTypes } = require('sequelize');
const donation = require('./donation.model');
const user = require('./user.model');

const chatRoom = (sequelize) => sequelize.define('chatRoom', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
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

chatRoom.hasOne(donation);
chatRoom.BelongsToMany(user);
user.hasMany(chatRoom);

module.exports = chatRoom;
