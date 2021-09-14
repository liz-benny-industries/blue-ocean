/* eslint-disable no-console */
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { googleAuthCreds } = require('../config/config');

const {
  clientId,
  clientSecret,
  redirectUri,
  refreshToken: refresh_token,
} = googleAuthCreds;

const oauth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUri
);
oauth2Client.setCredentials({ refresh_token });

async function sendMail(message, email) {
  try {
    const accessToken = await oauth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      auth: {
        type: 'OAuth2',
        user: 'bulletstobytes@gmail.com',
        clientId,
        clientSecret,
        refreshToken: refresh_token,
        accessToken,
      },
    });

    const mailOptions = {
      from: 'server 👻',
      to: email,
      subject: 'Someone claimed your item!',
      text: 'Hello',
      html: message,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { sendMail };
