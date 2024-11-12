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

    }
  })

 
});

