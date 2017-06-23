// localStorage.host = "http://techsanjal.com/feed/questions.rss";
// localStorage.host = "http://127.0.0.1:2222/test/feed.rss";

// Set variables for the first time;
if (!localStorage.interval) {
  localStorage.interval = 30;
}
if(!localStorage.host){
  localStorage.host = "http://techsanjal.com/feed/questions.rss";
}
if(!localStorage.load){
  localStorage.load = 20;
}
if (!localStorage.lastNotificattionId) {
  localStorage.lastNotificattionId = 0;
}
if(!localStorage.firstLoad){
  localStorage.firstLoad = true;
}else{
  localStorage.firstLoad = false;
}
if(localStorage.lastfeed){
  var lastfeed = JSON.parse(localStorage.lastFeed);
}else{
  getFeed(localStorage.host);
}

try {
  lastFeedTree = new rssTree(JSON.parse(localStorage.lastFeed).items);
} catch (e) {
  setTimeout(function(){console.log("sleeping zZz")} ,500)
}
var interval = 0;
setInterval(function () {
  // Execuite every seconds.
  interval++;
  if (interval>=Number(localStorage.interval)) {
    getFeed(localStorage.host);
    interval = 0;
  }
}, 1000);

notifyEventHandler();


// functions
function notifyEventHandler(){
  chrome.notifications.onClicked.addListener(function(id){
    if(id != "info"){
      try {
        var temp=lastFeedTree.getId(id);
      } catch (e) {
        lastFeedTree = new rssTree(JSON.parse(localStorage.lastFeed).items);
      } finally {
        chrome.notifications.clear(id,function(){
          console.log("notification cleared");
        })
        chrome.tabs.create({url: temp.link});
      }
    }
  });
}
