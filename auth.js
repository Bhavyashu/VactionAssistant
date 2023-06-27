const { google } = require('googleapis');
const readline = require('readline');
const credentials = require('./credentials.json');
const fs = require('fs');
const TOKEN_PATH = 'token.json';

const SCOPES = [
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.compose'
];

const oAuth2Client = new google.auth.OAuth2(
  credentials.web.client_id,
  credentials.web.client_secret,
  credentials.web.redirect_uris[0]
);

/**
 * Retrieves the access token for Gmail API.
 * If the access token is not present, it generates it when the user authorizes themselves.
 *
 * @returns {Promise} - A promise that resolves to the authorized Gmail client.
 */
function getAccessToken() {
  return new Promise((resolve, reject) => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });

    console.log('Authorize this app by visiting this URL:', authUrl);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('Enter the code from the authorization page: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) {
          reject(new Error('Error retrieving access token: ' + err.message));
        } else {
          oAuth2Client.setCredentials(token);
          storeToken(token);
          resolve(oAuth2Client);
        }
      });
    });
  });
}

/**
 * Stores the access token in the file system.
 *
 * @param {object} token - The access token to be stored.
 */
function storeToken(token) {
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored in', TOKEN_PATH);
}

/**
 * Retrieves the stored access token from the file system.
 *
 * @returns {object|null} - The retrieved access token, or null if not found.
 */
function retrieveToken() {
  try {
    const token = fs.readFileSync(TOKEN_PATH);
    return JSON.parse(token);
  } catch (error) {
    return null;
  }
}

module.exports = {
  getAccessToken,
  storeToken,
  retrieveToken,
  oAuth2Client,
  SCOPES
};
