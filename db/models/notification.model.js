import { DataTypes } from 'sequelize';
import User from './user.model';
import Donation from './donation.model';

export default (sequelize) => sequelize.define('Notification', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    autoIncrement: true,
    allowNull: false,
  },
  viewed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  claimant_id: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'id',
    },
  },
  donor_id: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'id',
    },
  },
  donation_id: {
    type: DataTypes.UUID,
    references: {
      model: Donation,
      key: 'id',
    },
  },
});
