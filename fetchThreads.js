/**
 * Fetches unread threads from Gmail that have not been replied to.
 *
 * @param {object} gmail - The Gmail API client.
 * @param {Map} repliedThreads - The map containing the replied threads.
 * @returns {Array} - An array of filtered threads that are unread and not replied to.
 */

async function fetchThreads(gmail, repliedThreads) {
  // Shallow fetch
  const response = await gmail.users.threads.list({
    userId: 'me',
    q: `is:unread -from:me -is:sent`, // It means get all the threads that are unread, exclude the threads that are sent by or threads having ['SENT'] label
  });

  const threads = response.data.threads || [];

  // Now filter only the threads whose thread ids are not present in this hashset so that we don't process any further in the application
  const filteredThreads = threads.filter((thread) => {
    return !repliedThreads.has(thread.id);
  });

  return filteredThreads;
}

module.exports = fetchThreads;
