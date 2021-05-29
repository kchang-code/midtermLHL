$(() => {

  //this is sample test
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for (user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;

  //request to read map
  $.ajax({
    method: "GET",
    url: "/maps"
  }).done((maps) => {
    for (map of maps) {
      $("<div>").text(map).appendTo($("body"));
    }
  });

  //login
  $.ajax({
    method: "POST",
    url: "/login"
  }).done((cookie) => {
    console.log(cookie);
  });
});
