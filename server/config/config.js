require('dotenv').config();

const {
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_NAME,
  DB_HOST,
  GOOGLE_MAPS_API_KEY,
  GOOGLE_AUTH_CLIENT_ID,
  GOOGLE_AUTH_CLIENT_SECRET,
  GOOGLE_AUTH_REDIRECT_URI,
  GOOGLE_AUTH_REFRESH_TOKEN,
  FIREBASE_TYPE,
  FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY_ID,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_CLIENT_ID,
  FIREBASE_AUTH_URI,
  FIREBASE_TOKEN_URI,
  FIREBASE_AUTH_PROVIDER_URL,
  FIREBASE_CLIENT_CERT_URL,
  S3_ACCESS_KEY,
  S3_SECRET,
} = process.env;

module.exports = {
  dbCreds: {
    user: DB_USER || 'postgres',
    password: DB_PASSWORD || 'postgres',
    port: DB_PORT || 5432,
    name: DB_NAME || 'donation_station',
    host: DB_HOST || 'localhost',
  },
  mapApiKey: GOOGLE_MAPS_API_KEY,
  googleAuthCreds: {
    clientId: GOOGLE_AUTH_CLIENT_ID || '0',
    clientSecret: GOOGLE_AUTH_CLIENT_SECRET || '',
    redirectUri: GOOGLE_AUTH_REDIRECT_URI || 'https://developers.google.com/oauthplayground',
    refreshToken: GOOGLE_AUTH_REFRESH_TOKEN || '',
  },
  firebaseCreds: {
    type: FIREBASE_TYPE || 'service_account',
    projectId: FIREBASE_PROJECT_ID || 'sandbox-3a2e3',
    privateKeyId: FIREBASE_PRIVATE_KEY_ID || '',
    privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') || '',
    clientEmail: FIREBASE_CLIENT_EMAIL || '',
    clientId: FIREBASE_CLIENT_ID || 0,
    authUri: FIREBASE_AUTH_URI || 'https://accounts.google.com/o/oauth2/auth',
    tokenUri: FIREBASE_TOKEN_URI || 'https://oauth2.googleapis.com/token',
    authProviderUrl: FIREBASE_AUTH_PROVIDER_URL || 'https://www.googleapis.com/oauth2/v1/certs',
    clientCertUrl: FIREBASE_CLIENT_CERT_URL || '',
  },
  s3Creds: {
    accessKey: S3_ACCESS_KEY || '0',
    secret: S3_SECRET || '0',
  },
};
