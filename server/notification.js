/* eslint-disable no-console */
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
require('dotenv').config();

const {
  CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN
} = process.env;

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(message, email) {
  try {
    const accessToken = await oauth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      auth: {
        type: 'OAuth2',
        user: 'bulletstobytes@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken
      },
    });

    const mailOptions = {
      from: 'server 👻',
      to: email,
      subject: 'Someone claimed your item!',
      text: 'Hello',
      html: message
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { sendMail };
