function clickSkipButton() {
  chrome.runtime.sendMessage({ action: 'getSharedData' }, response => {
    if (response.data) {
      ({ skipIntro, skipRecap, nextEpisode } = response.data);

      const skipRecapBtn = document.querySelector(
        'button[data-uia="player-skip-recap"]'
      );
      const skipIntroBtn = document.querySelector(
        'button[data-uia="player-skip-intro"]'
      );
      const nextEpisodeBtn = document.querySelector(
        'button[data-uia="next-episode-seamless-button"]'
      );
      const nextEpisodedrainBtn = document.querySelector(
        'button[data-uia="next-episode-seamless-button-draining"]'
      );

      if (skipIntroBtn && skipIntro) {
        skipIntroBtn.click();
      } else if (skipRecapBtn && skipRecap) {
        skipRecapBtn.click();
      } else if ((nextEpisodeBtn || nextEpisodedrainBtn) && nextEpisode) {
        (nextEpisodeBtn || nextEpisodedrainBtn).click();
      }
    }
  });

  
}

// MutationObserver to monitor DOM changes
const observer = new MutationObserver(() => {
  clickSkipButton();
});

// Observe the entire document for changes
observer.observe(document, { childList: true, subtree: true });

// In case the button is already on screen
clickSkipButton();
