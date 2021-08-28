// const sequelize = require('./index');
const userModel = require('./models/user.model');
const donationModel = require('./models/donation.model');
const imageModel = require('./models/image.model');
// require('./models/chatRoom.model');
// require('./models/notification.model');

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
    const { User, Donation, Image } = sequelize.models;
    Donation.belongsTo(User, { as: 'claimant_id', foreignKey: 'id' });
    Donation.belongsTo(User, { as: 'donor_id', foreignKey: 'id' });
    Donation.hasMany(Image);
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
