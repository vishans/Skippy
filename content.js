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

document.addEventListener("wheel", (event) => {
  console.log("Scroll detected:", event.deltaY);
  // Check scroll direction
  if (event.deltaY < 0) {
      console.log("Scrolling up - simulating ArrowUp key press");
      simulateKeyPress("ArrowUp");
  } else if (event.deltaY > 0) {
      console.log("Scrolling down - simulating ArrowDown key press");
      simulateKeyPress("ArrowDown");
  }
});

// Function to simulate a key press event
function simulateKeyPress(key) {

  const event = new KeyboardEvent("keydown", {
      key: key,
      code: key,
      keyCode: key === "ArrowUp" ? 38 : 40, // ArrowUp = 38, ArrowDown = 40
      which: key === "ArrowUp" ? 38 : 40,
      bubbles: true,
      cancelable: true,
  });
  
  setTimeout(() => {
    document.body.dispatchEvent(event);
    console.log(`Simulated key press event for ${key} dispatched`);
}, 10); // 10ms delay to ensure the event registers

}