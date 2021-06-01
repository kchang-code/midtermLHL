// FAVOURITES
const createFavouriteMaps = (favouriteMaps) => {
  for (const i in favouriteMaps) {
    for (const b in favouriteMaps[i]) {
      const $favouriteMaps = `
      <input type= "submit" class="favouriteMap-name" name="favName" value="${favouriteMaps[i][b].id}">
      <i class="fas fa-times-circle fa-lg"></i>
    `;
      $("<div id='user-file'>").html($favouriteMaps).appendTo($(".square-fav-maps"));
    }
  }
}

// view all favorite maps
const favoriteViewAllMaps = () => {
  $.ajax({
    method: "GET",
    url: "/favourites"
  }).done((favMaps) => {
    createFavouriteMaps(favMaps)
  })
}


// View all latest favourite maps
const favouriteViewLatestMaps = () => {
  $.ajax({
    method: "GET",
    url: "/favourites/last"
  }).done((favMaps) => {
    createFavouriteMaps(favMaps)
  })
}

// Add favourite maps
const favouriteAddMap = (req) => {
  $.ajax({
    method: 'POST',
    url: '/favourites',
    data: $(req).serialize()
  })
    .then(() => {
      console.log('favorite form submitted')
    });
}


