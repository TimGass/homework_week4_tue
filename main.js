var profileObj;
var reposObj;
var profile = $(".profile");

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
  profile.append("<img src=" + profileObj.avatar_url + "alt=a blank avatar that looks like a series of blocks />");
  profile.append("<h1> " + profileObj.name + " </h1>");
  profile.append("<h2> " + profileObj.login + " </h2>");
  profile.append("<h6> " + profileObj.location + " </h6>");
  profile.append("<h6> Joined on " + month + "/" + day + "/" + year + " </h6>");
  profile.append("<a href=#> <strong>" + profileObj.followers + "</strong> Followers </a>");
  $.getJSON("https://api.github.com/users/TimGass/starred").done(function(data){
    profile.append("<a href=#> <strong>" + data.length + "</strong> starred </a>");
  });
  profile.append("<a href=#> <strong>" + profileObj.following + "</strong> Following </a>");
  $.getJSON("https://api.github.com/users/TimGass/orgs").done(function(data){
    profile.append("<h4> Organizations " + data + " </h4>");
  });
});

$.getJSON("https://api.github.com/users/TimGass/repos").done(function(data){
  reposObj = data;
  console.log(profileObj);
  console.log(reposObj);

  reposObj.sort(function(a, b){
    var yolo = new Date(a.updated_at).getTime();
    var swag = new Date(b.updated_at).getTime();
    return swag - yolo;
  });


  reposObj.forEach(function(item){
    var time = new Date(item.updated_at);
    var repos = $("<li class=repo-name ><a href=" + item.html_url + "> " + item.name + " </a><p> updated " + gitTime(time) + " </p></li>");
    $(".repos").append(repos);
    $(".repos").append("<section class=repo-stats></section");
    console.log(item.languages_url);
    $.getJSON(item.languages_url).done(function(data){ $(".repo-name").append("<p> " + Object.keys(data)[0] + " </p>") });
  });
});
