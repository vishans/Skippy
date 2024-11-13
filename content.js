function clickSkipButton() {
  chrome.runtime.sendMessage({ action: 'getSharedData' }, response => {
    if (response.data) {
      ({ skipIntro, skipRecap, nextEpisode, scrollDelta } = response.data);

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


observer.observe(document, { childList: true, subtree: true });

// In case the button is already on screen
clickSkipButton();

document.addEventListener("wheel", (event) => {
  const video = document.querySelector("video");
  
  chrome.runtime.sendMessage({ action: 'getSharedData' }, response => {
    if (response.data) {
      ({ skipIntro, skipRecap, nextEpisode, scrollDelta, scrollReverse } = response.data);
      
      if(!scrollReverse){
        // 0 <= video.volume <= 1
        if ((event.deltaY < 0)) {
          video.volume = Math.max(video.volume - scrollDelta, 0);
        }else{
          video.volume = Math.min(1, video.volume + scrollDelta);
        }
      }else{
        if ((event.deltaY < 0)) {
          video.volume = Math.min(1, video.volume + scrollDelta);
        }else{
          video.volume = Math.max(video.volume - scrollDelta, 0);
        }
      }

      showVolumeOverlay(video.volume);

    }
  })

 
});


function showVolumeOverlay(volume) {
  let overlay = document.querySelector(".volume-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "volume-overlay";
    document.body.appendChild(overlay);
  }
  
  overlay.innerText = `Volume: ${(volume * 100).toFixed(0)}%`;
  overlay.style.opacity = "1";
  
  // Hide overlay after a short delay
  clearTimeout(window.volumeOverlayTimeout);
  window.volumeOverlayTimeout = setTimeout(() => {
    overlay.style.opacity = "0";
  }, 1000);
}


// Add some basic styles for the volume overlay
const style = document.createElement("style");
style.innerHTML = `
  .volume-overlay {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    font-size: 8vh;
    text-align: center;
    width: 45vh;  /* Increase width */
    height: 45vh; /* Increase height */
    transition: opacity 0.5s;
    pointer-events: none;
  }
`;
document.head.appendChild(style);