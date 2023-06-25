// fetchThreads.js

async function fetchThreads(gmail, repliedThreads) {
  //shallow fetch 
    const response = await gmail.users.threads.list({
      userId: 'me',
      q: `is:unread -from:me -is:sent`, //it means get all the threads that are unread, exlude the threads that are sent by or threads having ['SENT'] label
    });

    const threads = response.data.threads || [];
    
    //now filter only the threads whos thread ids are not present in this hashet so that we don't process any further in the application

    const filteredThreads = threads.filter((thread) => {
        return !repliedThreads.has(thread.id);
      });
  
    return filteredThreads;
  }
  
  module.exports = fetchThreads;
  