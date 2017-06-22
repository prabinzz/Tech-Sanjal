
// var host = "http://127.0.0.1:2222/test/feed.rss";
var host = "http://techsanjal.com/feed/questions.rss";

var lastfeed = JSON.parse(localStorage.lastFeed)

  // $("#demo")[0].innerHTML=JSON.parse(localStorage.lastFeed).loadedIn;

// var rss;

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
