const { DataTypes } = require('sequelize');
// const Donation = require('./donation.model');

module.exports = (sequelize) => sequelize.define('image', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
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
