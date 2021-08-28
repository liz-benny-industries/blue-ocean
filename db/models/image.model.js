const { DataTypes } = require('sequelize');
// const Donation = require('./donation.model');

module.exports = (sequelize) => sequelize.define('Image', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    // autoIncrement: true,
    allowNull: false,
  },
  // donation_id: {
  //   type: DataTypes.UUID,
  //   references: {
  //     model: Donation,
  //     key: 'id',
  //   },
  // },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Donation.hasMany(Image);

// module.exports = Image;
