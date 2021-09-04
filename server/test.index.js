const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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
    const server = app.listen(3003, () => {
      console.log('🧬🧬TESTING on PORT 3003🧬🧬');
    });
    server();
  } catch (e) {
    console.log('Server could not be started');
  }
};

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated');
  });
});

module.exports = { init, app };
