const browserAPI = window.browser || window.chrome;
var skipIntro, skipRecap, nextEpisode;

console.log('here');
document.addEventListener('DOMContentLoaded', () => {
  // Get references to the UI elements
  const skipRecapSwitch = document.getElementById('skipRecapSwitch');
  const skipIntroSwitch = document.getElementById('skipIntroSwitch');
  const nextEpisodeSwitch = document.getElementById('nextEpisodeSwitch');
  const saveButton = document.getElementById('saveButton');

  // Load the saved settings and update the UI accordingly
  chrome.runtime.sendMessage({ action: 'getSharedData' }, response => {
    console.log(response.data);
    if (response.data) {
      ({ skipIntro, skipRecap, nextEpisode } = response.data);

      skipRecapSwitch.checked = skipRecap;
      skipIntroSwitch.checked = skipIntro;
      nextEpisodeSwitch.checked = nextEpisode;
    }
  });

  // Save settings when the Save button is clicked
  saveButton.addEventListener('click', () => {
    const settings = {
      skipRecap: skipRecapSwitch.checked,
      skipIntro: skipIntroSwitch.checked,
      nextEpisode: nextEpisodeSwitch.checked,
    };

    chrome.runtime.sendMessage(
      { action: 'setSharedData', data: settings },
      response => {
        console.log(response.message); // Logs: 'Data stored in background'
      }
    );
  });
});
