function clickSkipButton() {
  // Look for skip element
  const skipButton =
    document.querySelector('button[data-uia="player-skip-recap"]') ||
    document.querySelector('button[data-uia="player-skip-intro"]') ||
    document.querySelector('button[data-uia="next-episode-seamless-button"]') ||
    document.querySelector(
      'button[data-uia="next-episode-seamless-button-draining"]'
    );

  if (skipButton) {
    // Click the "Skip Intro" button if it's found
    skipButton.click();
  }
}

// MutationObserver to monitor DOM changes
const observer = new MutationObserver(() => {
  clickSkipButton();
});

// Observe the entire document for changes
observer.observe(document, { childList: true, subtree: true });

// In case the button is already on screen
clickSkipButton();
