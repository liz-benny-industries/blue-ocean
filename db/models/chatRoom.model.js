const { DataTypes } = require('sequelize');
const Donation = require('./donation.model');
const user = require('./user.model');

const chatRoom = (sequelize) => sequelize.define('chatRoom', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    // autoIncrement: true,
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

chatRoom.hasOne(Donation);
chatRoom.BelongsToMany(user);
user.hasMany(chatRoom);

module.exports = chatRoom;
