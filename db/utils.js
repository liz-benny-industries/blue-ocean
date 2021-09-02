const userModel = require('./models/user.model');
const donationModel = require('./models/donation.model');
const imageModel = require('./models/image.model');

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
  const models = [userModel, donationModel, imageModel];
  models.forEach((model) => model(sequelize));
  console.log('sequelize.models:', sequelize.models);
};

const configureRelationships = (sequelize) => {
  try {
    const {
      user, donation, image, distance
    } = sequelize.models;
    donation.belongsTo(user, { as: 'donor' }); // TODO: Should not be null
    donation.hasMany(image);
    distance.hasOne(user);
    distance.hasOne(donation);
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
