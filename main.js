chrome.browserAction.onClicked.addListener((tab) => {
  videoUrls = [];
  exec(tab);
});

let videoUrls;
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

    if (videoUrls) {
      videoUrls = videoUrls.filter((item, pos, self) => {
        return self.indexOf(item) === pos;
      });

      console.log('VIDEO URLS FILTERED!', videoUrls);

      videoUrls.forEach((videoUrl) => {
        if (videoUrl !== '') {
          chrome.tabs.create({ url: videoUrl });
        }
      });
    }
  });
}