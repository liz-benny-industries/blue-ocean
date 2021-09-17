const admin = require('firebase-admin');
const { firebaseCreds } = require('../config');

const {
  type,
  projectId,
  privateKeyId,
  privateKey,
  clientEmail,
  clientId,
  authUri,
  tokenUri,
  authProviderUrl,
  clientCertUrl,
} = firebaseCreds;

admin.initializeApp({
  credential: admin.credential.cert({
    type,
    project_id: projectId,
    private_key_id: privateKeyId,
    private_key: privateKey,
    client_email: clientEmail,
    client_id: clientId,
    auth_uri: authUri,
    token_uri: tokenUri,
    auth_provider_x509_cert_url: authProviderUrl,
    client_x509_cert_url: clientCertUrl,
  }),
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
