import { DataTypes } from 'sequelize';

export default (sequelize) => sequelize.define('Donation', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    autoIncrement: true,
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
  donor_id: {
    type: DataTypes.UUID,
    references: 'users', // if breaks, refactor per image model
    referencesKey: 'id',
  },
  claimant_id: {
    type: DataTypes.UUID,
    references: 'users',
    referencesKey: 'id',
  },
});
