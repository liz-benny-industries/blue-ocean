const express = require('express');
const path = require('path');
const morgan = require('morgan');

const {
  assertDbConnected,
  defineModels,
  configureRelationships,
} = require('../db/utils');
const testSequelize = require('../db');
const { decodeIDToken } = require('./routes/middleware');
const { DonationController, UserController } = require('./routes');

const app = express();
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.json());
app.use(decodeIDToken);
app.use(morgan('common'));

const init = async () => {
  try {
    await assertDbConnected(testSequelize);
    defineModels(testSequelize);
    configureRelationships(testSequelize);
    await testSequelize.sync();
    DonationController(app, testSequelize);
    UserController(app, testSequelize);
    app.listen(3003, () => {
      console.log('🧬🧬TESTING on PORT 3003🧬🧬');
    });
  } catch (e) {
    console.log('Server could not be started');
  }
};

module.exports = { init, testSequelize };
