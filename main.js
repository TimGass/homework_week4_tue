var profileObj;
var reposObj;
var profile = $(".profile");

function gitTime(original){
  var time = new Date(original);
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

  function Headergenerator(){
    var headerTemplate = $("#header").html();
    var compiledTemplate = _.template(headerTemplate);
    $("header").append(compiledTemplate(profileObj));
  }

  Headergenerator();

  function Profilegenerator(){
    profileObj.time = new Date(profileObj.created_at);
    profileObj.month = profileObj.time.getMonth();
    profileObj.day = profileObj.time.getDate();
    profileObj.year = profileObj.time.getFullYear();
    var profileTemplate = $("#profile").html();
    var compiledTemplate = _.template(profileTemplate);
    $(".profile").append(compiledTemplate(profileObj));
  };

  $.getJSON("https://api.github.com/users/TimGass/starred").done(function(data){
    profileObj.starred = data.length;
    profileObj.organizations = $.getJSON("https://api.github.com/users/TimGass/starred").done(function(data){
      profileObj.organizations = data;
      Profilegenerator();
    });
  });
});

$.getJSON("https://api.github.com/users/TimGass/repos").done(function(data){
  reposObj = data;

  reposObj.sort(function(a, b){
    var yolo = new Date(a.updated_at).getTime();
    var swag = new Date(b.updated_at).getTime();
    return swag - yolo;
  });

  function Repogenerator(){
    var repoTemplate = $("#repos").html();
    var compiledTemplate = _.template(repoTemplate);
    reposObj.forEach(function(repoData) {
      $(".repos").append(compiledTemplate(repoData));
    });
  };
  Repogenerator();
  });
