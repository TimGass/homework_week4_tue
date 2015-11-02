var profileObj;
var reposObj;
var profile = $(".profile");
var languages = [];

function gitTime(time){
  var seconds = (Date.now() - time)/1000;
  var hours = Math.floor(seconds/3600);
  var days = Math.floor(hours/24);
  var month = "on " + (time.getMonth().toString() + "/" + time.getDate().toString());
  if(hours < 24){
    return (hours + " hours ago");
  }

  if(days < 30){
    return (days + " days ago");
  }
  else{
     return month;
  }
};

$.getJSON("https://api.github.com/users/TimGass").done(function(data){
  profileObj = data;
  var time = new Date(profileObj.created_at);
  var month = time.getMonth();
  var day = time.getDate();
  var year = time.getFullYear();
  $("header").append("<a href=#><img src=" + profileObj.avatar_url + "/>" + "<span id='last' class='octicon octicon-triangle-down'></span></a>");
  profile.append("<img src=" + profileObj.avatar_url + "alt=a blank avatar that looks like a series of blocks />");
  profile.append("<h1> " + profileObj.name + " </h1>");
  profile.append("<h2> " + profileObj.login + " </h2>");
  profile.append("<h6> " + profileObj.location + " </h6>");
  profile.append("<h6> Joined on " + month + "/" + day + "/" + year + " </h6>");
  profile.append("<a href=#> <strong>" + profileObj.followers + "</strong> Followers </a>");
  $.getJSON("https://api.github.com/users/TimGass/starred").done(function(data){
    profile.append("<a href=#> <strong>" + data.length + "</strong> starred </a>");
  });
  setTimeout(function(){return profile.append("<a href=#> <strong>" + profileObj.following + "</strong> Following </a>");}, 100);
  setTimeout(function(){$.getJSON("https://api.github.com/users/TimGass/orgs").done(function(data){
    profile.append("<h4> Organizations " + data + " </h4>");
  });}, 400);
});

$.getJSON("https://api.github.com/users/TimGass/repos").done(function(data){
  reposObj = data;

  reposObj.sort(function(a, b){
    var yolo = new Date(a.updated_at).getTime();
    var swag = new Date(b.updated_at).getTime();
    return swag - yolo;
  });


  reposObj.forEach(function(item){
    var time = new Date(item.updated_at);
    var reposStats = "<section class=repo-stats><p> " + item.language + "<span class='octicon octicon-star'></span>" + item.stargazers_count + "<span class='octicon octicon-git-branch'></span>" + item.forks_count + "</p></section>";
    var repos = $("<li class=repo-name ><a href=" + item.html_url + "> " + item.name + " </a>" + reposStats + "<p> updated " + gitTime(time) + " </p></li>");
    $(".repos").append(repos);
  });
});
