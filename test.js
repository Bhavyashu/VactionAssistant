const { google } = require('googleapis');
const auth = require('./auth');
const createLabel = require('./createLabel');
const getReply = require('./replyGenerator');
const fetchThreads = require('./FeatchThread');
const generateReplyEmail = require('./replyGenerator');

async function startEmailService() {
    const token = auth.retrieveToken();
  
    if (token) {
      auth.oAuth2Client.setCredentials(token);
    } else {
      const authClient = await auth.getAccessToken();
      auth.oAuth2Client.setCredentials(authClient.credentials);
    }
    const fromEmail="the.bhavyashu@gmail.com";
    const message = "";
    const gmail = google.gmail({ version: 'v1', auth: auth.oAuth2Client });
    const replyStatus = await generateReplyEmail(gmail, fromEmail, message);

    setInterval(async () => {
        console.log('Fetching new unread and unreplied emails...');
        console.log(replyStatus.data);
      }, 10000);
    }
startEmailService()