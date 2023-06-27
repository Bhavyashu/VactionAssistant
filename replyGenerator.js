/**
 * Generates a reply email message and sends it to the sender.
 *
 * @param {object} gmail - The Gmail API client.
 * @param {string} fromEmail - The email address of the sender.
 * @param {object} message - The original message object received.
 * @param {string} threadId - The ID of the thread to which the reply will be sent.
 * @returns {object} - The response object containing information about the sent reply.
 */
async function generateReplyEmail(gmail, fromEmail, message, threadId) {
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

  const encodedReply = Buffer.from(replyEmail).toString('base64'); // Encode the data along with the body

  // Send the reply message to the sender
  const replyMessage = await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedReply,
      threadId: threadId,
    },
  });

  return replyMessage;
}

module.exports = generateReplyEmail;
