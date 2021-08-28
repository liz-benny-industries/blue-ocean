const express = require('express');
const path = require('path');
const {
  assertDbConnected,
  defineModels,
  configureRelationships,
} = require('../db/utils');
const sequelize = require('../db');

const app = express();
app.use(
  '/public',
  express.static(path.join(__dirname, '../client/public'))
);
app.use(express.json());

const init = async () => {
  try {
    await assertDbConnected(sequelize);
    defineModels(sequelize);
    configureRelationships(sequelize);
    await sequelize.sync();
    app.listen(3000, () => {
      console.log('👂👀 Server Listening on PORT 3000👂👀');
    });
  } catch (e) {
    console.log('Server could not be started');
  }
};

init();
