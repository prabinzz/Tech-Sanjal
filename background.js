// localStorage.host = "http://127.0.0.1:2222/test/feed.rss";
// localStorage.host = "http://techsanjal.com/feed/questions.rss";

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
var interval = 0;
setInterval(function () {
  // Execuite every seconds.
  interval++;
  if (interval>=Number(localStorage.interval)) {
    getFeed(localStorage.host);
    interval = 0;
  }
}, 1000);
