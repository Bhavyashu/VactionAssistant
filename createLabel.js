let labelId = null;

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
module.exports = createLabel
