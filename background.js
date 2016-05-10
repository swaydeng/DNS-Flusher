var	bm = chrome.benchmarking,
    tabs = chrome.tabs,
    optUrl = 'dns-flusher-options.html';

if(undefined == bm){ // benchmarking disabled
  tabs.create({url: optUrl});
}

function main(url) {
  if(undefined == bm){ // benchmarking disabled
        tabs.query({url: 'chrome-extension://*/' + optUrl}, function(tabArr){
            if(tabArr.length > 0){
                tabs.update(tabArr[0].id, {active: true});
            }else{
                tabs.create({url: optUrl});
            }
        });
        return;
    } else {
    // benchmarking enabled
    bm.closeConnections();
    bm.clearHostResolverCache();
    // chrome.storage.sync.set('reload', {
    //     reload: true
    // }); // TODO
  }
  chrome.storage.sync.get('reload', function(items) {
    tabs.query({
      active: true,
      currentWindow: true
    }, function(_tabs) {
      var tab = _tabs[0];
      if (url && url.trim() !== '') {
        if (!/^http/.test(url)) {
          url = 'http://' + url;
        }

        tabs.executeScript({
          code: 'window.location.href="' + url + '"'
        });
      } else {
        tabs.reload(tab.id);
      }
    });
  });
}

chrome.browserAction.onClicked.addListener(function(tab){
    main();
});

chrome.omnibox.onInputEntered.addListener(function(url, suggest) {
  main(url);
});
