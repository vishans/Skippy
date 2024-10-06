// Define a global variable to hold shared data
let sharedData = { skipIntro: true, skipRecap: true, nextEpisode: true };

// Listener for messages from content or popup scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'setSharedData') {
    // Store data received from content.js
    sharedData = request.data;
    sendResponse({ status: 'success', message: 'Data stored in background' });
  } else if (request.action === 'getSharedData') {
    // Send the stored data to popup.js
    sendResponse({ data: sharedData });
  }
});
