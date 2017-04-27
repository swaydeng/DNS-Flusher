var bm = chrome.benchmarking,
  tabs = chrome.tabs,
  optUrl = 'dns-flusher-options.html';

function main(url) {
  if(undefined == bm){ // benchmarking disabled
    tabs.create({url: optUrl});
  }
  bm.closeConnections();
  bm.clearHostResolverCache();
  if (url && url.trim() !== '') {
    if (!/^http/.test(url)) {
      url = 'http://' + url;
    }
    tabs.update(null, {
      url: url
    });
  } else {
    tabs.reload();
  }
}

function browserActionClicked() {
  main();
}
chrome.browserAction.onClicked.addListener(browserActionClicked);
chrome.omnibox.onInputEntered.addListener(main);
