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


//refresh all favourite maps
const refreshAllFavouriteMaps = (user_id) => {
  $.ajax({
    method: "GET",
    url: `/favourites/${user_id}`
  }).done((maps) => {
    createFavouriteMaps(maps);
  })
}

//create favourite maps
const createFavouriteMaps = (maps) => {
  for (const i in maps) {
    for (const a in maps[i]) {
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
      $("<div>").html(maps[i][a].name).appendTo($('.square-user-contributions'));
    }
  }
}
