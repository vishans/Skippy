const browserAPI = window.browser || window.chrome;
var skipIntro, skipRecap, nextEpisode;

document.addEventListener('DOMContentLoaded', () => {
  // Get references to the UI elements
  const skipRecapSwitch = document.getElementById('skipRecapSwitch');
  const skipIntroSwitch = document.getElementById('skipIntroSwitch');
  const nextEpisodeSwitch = document.getElementById('nextEpisodeSwitch');
  const scrollDeltaInput = document.getElementById('scrollDelta');
  const scrollDirection = document.getElementById("scrollDirectionReverse");
  const saveButton = document.getElementById('saveButton');

  // Load the saved settings and update the UI accordingly
  chrome.runtime.sendMessage({ action: 'getSharedData' }, response => {
    console.log(response.data);
    if (response.data) {
      ({ skipIntro, skipRecap, nextEpisode, scrollDelta, scrollReverse } = response.data);

      skipRecapSwitch.checked = skipRecap;
      skipIntroSwitch.checked = skipIntro;
      nextEpisodeSwitch.checked = nextEpisode;
      scrollDeltaInput.value = scrollDelta * 100;
      scrollDirection.checked = scrollReverse;
    }
  });

  // Save settings when the Save button is clicked
  saveButton.addEventListener('click', () => {
    window.close();
    
    const settings = {
      skipRecap: skipRecapSwitch.checked,
      skipIntro: skipIntroSwitch.checked,
      nextEpisode: nextEpisodeSwitch.checked,
      scrollDelta: scrollDeltaInput.value / 100,
      scrollReverse: scrollDirection.checked
    };

    chrome.runtime.sendMessage(
      { action: 'setSharedData', data: settings },
      response => {
        console.log(response.message); // Logs: 'Data stored in background'
      }
    );
  });
});
