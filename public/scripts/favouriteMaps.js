//view all favourite maps
const viewAllFavouriteMaps = (user_id) => {
  $.ajax({
    method: "GET",
    url: `/favourites/${user_id}`
  }).done((maps) => {
    createFavouriteMaps(maps);
    viewAllContributeMaps(user_id);
  })
}


//create favourite maps
const createFavouriteMaps = (maps) => {
  for (const i in maps) {
    for (const a in maps[i]) {
      console.log(maps[i][a]);
      $("<div>").html(maps[i][a].name).appendTo($('.square-fav-maps'));
    }
  }
}

//view all contribute maps
const viewAllContributeMaps = (user_id) => {
  $.ajax({
    method: "GET",
    url: `/maps/contribute/${user_id}`
  }).done((maps) => {
    createContributeMaps(maps);
  })
}


//create contribute maps
const createContributeMaps = (maps) => {
  for (const i in maps) {
    for (const a in maps[i]) {
      console.log(maps[i][a]);
      $("<div>").html(maps[i][a].name).appendTo($('.square-user-contributions'));
    }
  }
}
