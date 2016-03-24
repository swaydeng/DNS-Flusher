var	bm = chrome.benchmarking,
	tabs = chrome.tabs,
	optUrl = 'dns-flusher-options.html';

if(undefined == bm){ // benchmarking disabled
  tabs.create({url: optUrl});
}

function main() {
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
  }
  chrome.storage.sync.get('reload', function(items) {
	  if(items.reload) tabs.reload();
  });
}

chrome.browserAction.onClicked.addListener(function(){
	main();
});
