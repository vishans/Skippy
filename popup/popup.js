console.log('popup.js is loaded'); // At the very top of popup.js

console.log('here');
document.addEventListener('DOMContentLoaded', () => {
  // Get references to the UI elements
  const skipRecapSwitch = document.getElementById('skipRecapSwitch');
  const skipIntroSwitch = document.getElementById('skipIntroSwitch');
  const nextEpisodeSwitch = document.getElementById('nextEpisodeSwitch');
  const saveButton = document.getElementById('saveButton');

  // Load the saved settings and update the UI accordingly
  browser.storage.sync
    .get(['skipRecap', 'skipIntro', 'nextEpisode'])
    .then(settings => {
      skipRecapSwitch.checked = settings.skipRecap || false;
      skipIntroSwitch.checked = settings.skipIntro || false;
      nextEpisodeSwitch.checked = settings.nextEpisode || false;
    });

  // Save settings when the Save button is clicked
  saveButton.addEventListener('click', () => {
    console.log('hello world');

    const settings = {
      skipRecap: skipRecapSwitch.checked,
      skipIntro: skipIntroSwitch.checked,
      nextEpisode: nextEpisodeSwitch.checked,
    };
    browser.storage.sync.set(settings).then(() => {
      console.log('Settings saved');
    });
  });
});
