/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const morgan = require('morgan');

const {
  assertDbConnected,
  defineModels,
  configureRelationships,
} = require('../db/utils');
const sequelize = require('../db');
const { decodeIDToken } = require('./routes/middleware');
const { DonationController, UserController } = require('./routes');

const PORT = process.env.PORT || 3000;

const app = express();

app.use('*.js' || '*.jsx', (req, res, next) => {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.json());
app.use(decodeIDToken);
app.use(morgan('common'));

const init = async () => {
  try {
    await assertDbConnected(sequelize);
    defineModels(sequelize);
    configureRelationships(sequelize);
    await sequelize.sync();
    DonationController(app, sequelize);
    UserController(app, sequelize);
    app.listen(PORT, () => {
      console.log(`👂👀 Server Listening on PORT ${PORT}`);
    });
  } catch (e) {
    console.log('Server could not be started');
  }
};

init();
