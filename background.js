// Define a global variable to hold shared data
chrome.runtime.onInstalled.addListener(() => {
  // Set up initial state in chrome.storage if not already set
  chrome.storage.local.get(['sharedData'], (result) => {
    if (!result.sharedData) {
      chrome.storage.local.set({
        sharedData: { skipIntro: true, skipRecap: true, nextEpisode: true }
      });
    }
  });
});

// Listener for messages from content or popup scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'setSharedData') {
    // Store the shared data in chrome.storage.local
    chrome.storage.local.set({ sharedData: request.data }, () => {
      sendResponse({ status: 'success', message: 'Data stored in storage' });
    });
    // Return true to indicate that sendResponse will be called asynchronously
    return true;
  } else if (request.action === 'getSharedData') {
    // Retrieve the stored data from chrome.storage.local
    chrome.storage.local.get(['sharedData'], (result) => {
      sendResponse({ data: result.sharedData || {} });
    });
    // Return true to indicate that sendResponse will be called asynchronously
    return true;
  }
});
