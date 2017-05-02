function getVideoUrls() {
  const videoUrls = [];
  let videoEls = document.querySelectorAll('video, object, embed');

  for (let i = 0; i < videoEls.length; i++) {
    let videoEl = videoEls[i];
    if (videoEl.tagName === 'VIDEO') {
      videoUrls.push(videoEl.currentSrc.replace('blob:', ''));
    } else if (videoEl.tagName === 'OBJECT') {
      videoUrls.push(videoEl.getAttribute('data'));
    } else if (videoEl.tagName === 'EMBED') {

    }
  }
  return videoUrls;
}

chrome.runtime.sendMessage({
  action: 'getVideoUrls',
  source: getVideoUrls()
});

