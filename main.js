var profileObj;
var reposObj;

$.getJSON("https://api.github.com/users/TimGass").done(function(data){
  profileObj = data;
  $("body").prepend("<h6> " + profileObj.location + " </h6>");
  $("body").prepend("<h1> " + profileObj.name + " </h1>");
  $("body").prepend("<figure><img src=" + profileObj.avatar_url + "alt=a blank avatar that looks like a series of blocks /> </figure>");
});

$.getJSON("https://api.github.com/users/TimGass/repos").done(function(data){
  reposObj = data;
  console.log(profileObj);
  console.log(reposObj);

  reposObj.forEach(function(item){
    var repos = "<li class=repo-name ><a href="+item.html_url.toString() + "> " + item.name.toString() + " </a></li>";
    $(".repos").append(repos);
  });
});
