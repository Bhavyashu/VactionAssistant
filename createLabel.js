let labelId = null;
/**
 * Creates a label named "VacationEmails" if it doesn't already exist and returns its ID.
 * If the label already exists, the existing ID is returned.
 *
 * @param {object} gmail - The Gmail API client.
 * @returns {string} - The ID of the "VacationEmails" label.
 */
async function createLabel(gmail) {
  if (labelId) {
    return labelId; // If labelId already exists, return it immediately
  }

  const response = await gmail.users.labels.list({ userId: 'me' });
  const labels = response.data.labels;

  const label = labels.find((label) => label.name === 'VacationEmails');

  if (label) {
    labelId = label.id; // If label exists, set the labelId
    return labelId;
  }

  // Create a new label with name 'VacationEmails' if it doesn't exist in your Gmail account
  const createResponse = await gmail.users.labels.create({
    userId: 'me',
    requestBody: {
      name: 'VacationEmails',
      labelListVisibility: 'labelShow',
      messageListVisibility: 'show',
    },
  });

  const createdLabel = createResponse.data;
  labelId = createdLabel.id; // Set the labelId
  console.log('Label "VacationEmails" created.');

  return labelId;
}

module.exports = createLabel;
