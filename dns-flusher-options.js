var _m = chrome.i18n.getMessage
  store = chrome.storage.sync;

function $(id){
	return document.getElementById(id);
}

function setMsg(id){
	$(id).innerHTML = _m(id);
}

function initI18N(){
	document.title = _m('optionPageTitle') + ' - DNS Flusher for Chrome';
	setMsg('optionName');
	setMsg('optionLabel');
	setMsg('optionDescription');
	setMsg('attentionName');
	setMsg('attentionDescription');
  setMsg('addressBarReloadTips');
	// setMsg('ffOption');
}

function initReloadUI(){
	var el = $('reload-setting');

  store.get('reload', function(items) {
    if (null == items.reload) { // reload没有设置过, 那么就设置reload为true
      reload = true;
      store.set({reload: reload}, function() {
	      el.checked = reload;
      });
    } else {
	      el.checked = items.reload;
    }
  });

	el.onclick = function(){
		store.set({reload: el.checked});
	}
}

initI18N();
initReloadUI();


