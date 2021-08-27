// Express Server
const express = require('express');
const path = require('path');
// require('../db/index');

const app = express();
app.use(
  '/public',
  express.static(path.join(__dirname, '../client/public')),
);
app.use(express.json());

app.listen(3000, () => {
  console.log('👂👀 Server Listening on PORT 3000👂👀');
});
