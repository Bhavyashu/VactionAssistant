// fetchThreads.js

async function fetchThreads(gmail, repliedThreads) {
    const response = await gmail.users.threads.list({
      userId: 'me',
      q: `is:unread -from:me -is:sent`,
    });
    const threads = response.data.threads || [];
    const filteredThreads = threads.filter((thread) => {
        // console.log('Thread ID:', thread.id);
        // console.log('Data Type:', typeof thread.id);
        // console.log('Has Thread ID:', repliedThreads.has(thread.id));
        return !repliedThreads.has(thread.id);
      });
  
    return filteredThreads;
  }
  
  module.exports = fetchThreads;
  