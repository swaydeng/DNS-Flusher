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
  setMsg('attentionName');
  setMsg('attentionDescription');
  setMsg('addressBarReloadTips');
}

initI18N();


