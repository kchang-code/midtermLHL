const createMaps = (maps) => {
  for (const i in maps) {
    for (const a in maps[i]) {
      const $maps = `
        <input  type="submit" class="map-name" name="name" value="${maps[i][a].name}">
        <i class="fas fa-heart fa-lg"></i>

      `;
      $("<form id='user-file'>").html($maps).appendTo($(".square-view-all-maps"));
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

const addMap = (req) => {
  $.ajax({
    method: 'POST',
    url: '/maps',
    data: $(req).serialize()
  })
    .then(() => {
      console.log('form submitted');
    });
}

$(document).ready(() => {

  //login is handle by the html

  //view all maps
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

  //edit map
  $('.square-view-all-maps').on('click', '.map-name', (event) => {
    event.preventDefault();
    //**************** error handling *********
    //****************************************
    let mapName = $(event.target).val();
    console.log($(event.target).val());

    $.ajax({
      method: 'GET',
      url: `/maps/${mapName}`,
    })
      .then((result) => {
        $('#edit-map').empty('');
        // console.log(result.maps[0].name);
        $("<div>").html(`name: ${result.maps[0].name}`).appendTo($("#edit-map"));
        $("<div>").html(`description: ${result.maps[0].description}`).appendTo($("#edit-map"));
      });
  });

})




