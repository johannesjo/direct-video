function getVideoUrls() {
  console.log('I am here!');

  const videoUrls = [];
  let videoEls = document.querySelectorAll('video, object, embed');

  for (let i = 0; i < videoEls.length; i++) {
    let videoEl = videoEls[i];
    let src = videoEl.currentSrc.replace('blob:', '');
    videoUrls.push(src);
  }
  return videoUrls;
}

chrome.runtime.sendMessage({
  action: 'getVideoUrls',
  source: getVideoUrls()
});

