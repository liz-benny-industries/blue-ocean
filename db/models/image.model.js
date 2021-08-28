import { DataTypes } from 'sequelize';
import Donation from './donation.model';

export default (sequelize) => sequelize.define('Image', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    autoIncrement: true,
    allowNull: false,
  },
  donation_id: {
    type: DataTypes.UUID,
    references: {
      model: Donation,
      key: 'id',
    },
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
