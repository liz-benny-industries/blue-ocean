const userModel = require('./models/user.model');
const donationModel = require('./models/donation.model');
const imageModel = require('./models/image.model');
const distanceModel = require('./models/distance.model');

/* eslint-disable global-require */

const assertDbConnected = async (sequelize) => {
  console.log('Checking database connection...');
  try {
    await sequelize.authenticate();
    console.log('Database connection OK!');
    return;
  } catch (error) {
    console.log('Unable to connect to the database!');
    console.error(error.message);
    process.exit(1);
  }
};

const defineModels = (sequelize) => {
  const models = [
    userModel,
    donationModel,
    imageModel,
    distanceModel,
  ];
  models.forEach((model) => model(sequelize));
};

const configureRelationships = (sequelize) => {
  try {
    const {
      user, donation, image, distance
    } = sequelize.models;
    donation.belongsTo(user, { as: 'donor' });
    donation.hasMany(image);
    donation.hasMany(distance);
    user.hasMany(distance);
    distance.belongsTo(user);
    distance.belongsTo(donation);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

module.exports = {
  assertDbConnected,
  defineModels,
  configureRelationships,
};
