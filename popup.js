
var lastfeed = JSON.parse(localStorage.lastFeed);
document.addEventListener("DOMContentLoaded",function(){
  // getFeed(localStorage.host);
  clearBadge(lastfeed);
  showUI(lastfeed);
  linkFunc();

})

function clearBadge(lastFeed){
  localStorage.lastViewedID = lastFeed.items[0].id;
  chrome.browserAction.setBadgeText({"text":""});
}
