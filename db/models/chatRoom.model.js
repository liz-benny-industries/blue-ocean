import { DataTypes } from 'sequelize';
import Donation from './donation.model';
import User from './user.model';

const ChatRoom = (sequelize) => sequelize.define('ChatRoom', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    autoIncrement: true,
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

ChatRoom.hasOne(Donation);
ChatRoom.BelongsToMany(User);
User.hasMany(ChatRoom);

export default ChatRoom;
