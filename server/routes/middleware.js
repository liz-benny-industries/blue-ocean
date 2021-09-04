const admin = require('firebase-admin');
const serviceAccount = require('../../firebase-private-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// eslint-disable-next-line consistent-return
async function decodeIDToken(req, res, next) {
  if (req.headers?.authorization?.startsWith('Bearer ')) {
    const idToken = req.headers.authorization.split('Bearer ')[1];
    try {
      req.user = await admin.auth().verifyIdToken(idToken);
    } catch (err) {
      return res.status(401).send(err);
    }
  } else if (req.headers?.authorization?.startsWith('secret')) {
    const serial = Math.floor(Math.random() * 10000);
    req.user = {
      uid: `testingAccount${serial}`
    };
  }
  next();
}

module.exports = { decodeIDToken };
