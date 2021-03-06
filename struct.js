
function rssTree(rssItems ){
  // rssTree object used to store rss feed data
  if(rssItems){
    // if Items are given as argument
    this.items = rssItems;
  }else{
    this.items = [];
  }
}

rssTree.prototype.getId = function (id) {
  for (i of this.items) {
    if(i.id == id){
      return i;
    }
  }
  return false;
};

function getFeed(url){
  console.log("fetching feeds");
  $.get(url, function(data){
    $xml = $(data);
    var channel = $xml.find("channel");
    var temp = new rssTree();
    temp.loadedIn = new Date();
//     localStorage.loadedIn = new Date();
    var items = $xml.find("item");
    items.each(function(){
      var i = $(this);
      // console.log(i);
      var item = {
        title : i.find("title").text(),
        id: i.find("link").text().split("/")[3],
        link : i.find("link").text(),
        description : i.find("description").text(),
        category : i.find("category").text(),
        date : i.find("pubDate").text(),
      }
      if(Number(localStorage.lastViewedID)< item.id){
        item.new = true;
      }
      temp.items.push(item);
    }) // items.each end>>>>

    if(!localStorage.lastViewedID){
      localStorage.lastViewedID=0;
    }
    lastFeedTree = new rssTree(temp.items);
    notIfy(temp, Number(localStorage.lastViewedID), Number(localStorage.lastNotificattionId));
    localStorage.lastFeed = JSON.stringify(temp);
  })
}

function showUI(data){
  // UI related code.
  var parent = document.getElementById('content');
  parent.innerHTML+=""
  var loaded = 0;
  for (i of data.items) {
    loaded++;
    if(loaded>localStorage.load){
      break;
    }else{

      itemParse(i, parent);
    }
  }
}


function notIfy(lFeed, lViewedID, lNotID){
  // Notification and stuff
  var temp = 0;
  // var r = Math.floor(Math.random()*50)
  for (var i of lFeed.items) {
    if(i.id > lViewedID){
      temp++;
      }
    if(i.id > lNotID){
      if(i.id > Number(localStorage.lastNotificattionId)){
        localStorage.lastNotificattionId = i.id;
      }
      var t = new Date(i.date);
      var time = /(..)(:..)/.exec(t);     // The prettyprinted time.
      var hour = time[1] % 12 || 12;                     // The prettyprinted hour.
      var period = time[1] < 12 ? 'A.M.' : 'P.M.';       // The period of the day.

      if(localStorage.firstLoad != "true"){
        notifyCore(hour + time[2] + ' ' + period+ "  "+t.getFullYear()+
        "/"+t.getMonth()+"/"+t.getDay(),'./img/icon.png',i.title, i
        )
      }else{
        notifyCore("Setup Done.","./img/icon.png","Thanks for installing our official extension")
        localStorage.firstLoad = false;
        break;
      }
    }
  }
  if (temp>0) {
    chrome.browserAction.setBadgeText({"text": temp.toString() });
  }
}


function notifyCore(title, icon, body, item){
  var options = {
    type : "basic",
    title : title,
    message : body,
    iconUrl: icon
  }
  if (!item) {
    chrome.notifications.create("info", options, function(){});
  }else{
    chrome.notifications.create(item.id, options, function(){});
  }

}

function itemParse(item, parent){
  // Convert items of feedTree structure into html code.
  item.title = upper(item.title);
  var temp='' ;
  var date = new Date(item.date);
  var now = new Date();
  var isoDate = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay();
  var isoDate2 = now.getFullYear() + "/" + now.getMonth() + "/" + now.getDay();
  if(isoDate == isoDate2){
    isoDate = "Today";
  }
  var time = /(..)(:..)/.exec(date);
  var hour = time[1] % 12 || 12;
  var period = time[1]< 12 ? 'A.M.' : 'P.M.';
  // console.log(item);
  temp+="<a href='"+item.link+"'><div id='item'><div class='head'>"+
  item.title+
  "</div>";
  if(item.description != ""){
    temp+="<hr>";
  }
  temp+="<div class='body'><p class='description'>" +
    item.description.toLocaleString() +
    "</p> </div> <div class='footer'>" +
    "<div class='category'>" +
    item.category +
    "</div>" +
    "<div class='date'>" +
    isoDate+
    "</div>" +
    "<div class='time'>"+
    hour+time[2]+" "+period+
    "</div>"+
    "</div>"+
    "</div></div></a>";
  parent.innerHTML+=temp;
}

function upper(s){
  return s.replace(s[0], s[0].toUpperCase());
}

function linkFunc(){
  // Add click event listener to all <a> tags
  // When clicked open new tab with href attribute url
  $("a").click(function() {
    chrome.tabs.create({url: this.href});
  })
}
