
document.addEventListener("DOMContentLoaded", function(){
  var interval = document.getElementById('interval');
  interval.value = Number(localStorage.interval);
  interval.addEventListener("change", function(){
    localStorage.interval =  this.value;
  })

  var max_feed = document.getElementById('max-feed');
  max_feed.value = Number(localStorage.load);
  max_feed.addEventListener("change", function(){
    localStorage.load =  this.value;
  })

  var host = document.getElementById('host');
host.value = localStorage.host;
  host.addEventListener("change", function(){
    localStorage.host =  this.value;
  })
})
