const admin = require('firebase-admin');
const serviceAccount = require('../../firebase-private-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function decodeIDToken(req, res, next) {
  if (req.headers?.authorization?.startsWith('Bearer ')) {
    const idToken = req.headers.authorization.split('Bearer ')[1];
    try {
      req.user = await admin.auth().verifyIdToken(idToken);
    } catch (err) {
      return res.status(401).send(err);
    }
  }
  next();
}

module.exports = { decodeIDToken };
