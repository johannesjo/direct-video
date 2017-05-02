let iFrames = document.getElementsByTagName('iframe');

chrome.runtime.sendMessage({
  action: 'getIframes',
  source: iFrames
});

