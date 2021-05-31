<<<<<<< HEAD
const createMaps = (maps) => {
  for (const i in maps) {
    for (const a in maps[i]) {
      const $maps = `
      <div>${maps[i][a].name}</div>
      <div>
      <i class="fas fa-heart fa-lg"></i>
      </div>
      `;
      $("<div id='user-file'>").html($maps).appendTo($(".square-view-all-maps"));
    }
  }
}

const viewAllMaps = () => {
  //view all maps
  $.ajax({
    method: "GET",
    url: "/maps"
  }).done((maps) => {
    createMaps(maps);
  })
}

const viewLatestMaps = () => {
  //view all maps
  $.ajax({
    method: "GET",
    url: "/maps/last"
  }).done((maps) => {
    createMaps(maps);
  })
}
=======
>>>>>>> 164a6c6741c28e3bf618654ea5c09143d37a6b14



$(document).ready(() => {})

  //login is handle by the html

  //view all maps
<<<<<<< HEAD
  viewAllMaps();

  //add maps
  $('#map-form').on('submit', function (event) {
    event.preventDefault();
    //**************** error handling *********
    //****************************************
    addMap(this);
    viewLatestMaps();
    $('#title-input').val('');
    $('#description-input').val('');
  });






=======
>>>>>>> 164a6c6741c28e3bf618654ea5c09143d37a6b14
