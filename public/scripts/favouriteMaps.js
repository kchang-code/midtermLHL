//view all favourite maps
const viewAllFavouriteMaps = (user_id) => {
  console.log('im here yas', user_id);
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
      console.log(maps[i][a]);
      $("<div>").html(maps[i][a].name).appendTo($('.square-fav-maps'));
    }
  }
}
