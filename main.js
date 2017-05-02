chrome.browserAction.onClicked.addListener((tab) => {
  exec(tab);
});

let videoUrls = [];
chrome.runtime.onMessage.addListener(function (request) {
  if (request.action === 'getVideoUrls') {
    videoUrls = videoUrls.concat(request.source);
  }
});

function exec() {
  chrome.tabs.executeScript(null, {
    file: 'get-video-urls.js',
    allFrames: true,
    runAt: 'document_idle'
  }, () => {
// If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    }
    console.log('VIDEO URLS!', videoUrls);
    if (videoUrls && videoUrls[0]) {
      chrome.tabs.create({ url: videoUrls[0] });
    }
  });
}