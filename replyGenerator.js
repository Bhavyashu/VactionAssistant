// generateReplyEmail.js

async function generateReplyEmail(gmail, fromEmail, message,threadId) {
    const replySubject = `Re: ${message.payload.headers.find((header) => header.name === 'Subject').value}`;
    const replyBody = `Thank you for your message. I would like to inform you that I am currently on vacation and will not be available until July 1st.`;
  
    const headers = {
      From: 'me',
      To: fromEmail,
      Subject: replySubject,
    };
  
    let replyEmail = '';
    Object.keys(headers).forEach((key) => {
      replyEmail += `${key}: ${headers[key]}\r\n`;
    });
    replyEmail += '\r\n' + replyBody;

    const encodedReply = Buffer.from(replyEmail).toString('base64'); //Encode the data along with the body
    const replyMessage = await gmail.users.messages.send({ //This function will send the reply to the unsent/new sender who contacted us
      userId: 'me',
       requestBody: {
        raw: encodedReply,
          threadId: threadId,
        },
    });

    return replyMessage;
}
module.exports = generateReplyEmail;
  