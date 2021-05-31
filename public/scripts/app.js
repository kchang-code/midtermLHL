const createMaps = (maps) => {
  for (const i in maps) {
    for (const a in maps[i]) {
      const $maps = `
        <input  type="submit" class="map-name" name="name" value="${maps[i][a].name}">
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

// const viewSingleMap = (maps) => {
//   $('#edit-map').empty('');
//   const $map = `
//   <form id='edit-single-map'>
//   </form>
//   `;
//   $(`<div>`).html(`name: ${maps.name}`).appendTo($("#edit-map"));
//   $(`<div>`).html(`description: ${maps.description}`).appendTo($("#edit-map"));
//   $(`<input type='submit' value='Edit' class='editButton'>`).appendTo($("#edit-map"));
// }

$(document).ready(() => {
  //create new popups
  const createNewPopUps = (maps) => {
    const $popups = `
          <div id='popupTitle'>
            <p>this is a title</p>
          </div>
          <div id='popupImage'>
            <p>Image goes here</p>
          </div>
          <div id='popupDescription'>
            <p>this is a description</p>
          </div>
          <div id='popupButtons'>
            <form method="POST">
              <label for="title-input">Title:</label>
              <input id="title-input" type="text" name='title'><br>
              <label for="description-input">Description:</label>
              <input id="description-input" type="text" name=description'>
              <input type="file"  accept="image/*" name="image" id="file"><br>
              <input type='submit' value='Edit' class='editButton'/>
              </form>
            </div>
          <div >
            <input type='button' value='Delete' class='deleteButton'/>
          </div>
            `;
    return $popups;
  }

  //  NEW MAP
  const mymap = L.map("mapid").setView([51.505, -0.09], 13);
  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const tiles = L.tileLayer(tileUrl, { attribution });
  tiles.addTo(mymap);
  // CREATE MARKER WHEREVER YOU CLICK
  mymap.on('click', function (e) {
    let marker = new L.marker(e.latlng).addTo(mymap);
    marker.bindPopup(createNewPopUps());
    marker.on("popupopen", onPopupOpen);
    return marker;
  });

  // DELETE BUTTON FUNCTIONALITY
  function onPopupOpen() {
    let tempMarker = this;
    // To remove marker on click of delete button in the popup of marker
    $(".deleteButton:visible").click(function () {
      mymap.removeLayer(tempMarker);
    });
  }


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

  //show single map
  $('.square-view-all-maps').on('click', '.map-name', (event) => {
    event.preventDefault();
    //**************** error handling *********
    //****************************************
    $.ajax({
      method: 'GET',
      url: `/maps/${$(event.target).val()}`,
    })
      .then((result) => {
        $('#edit-map').empty('');
        $(`<div>`).html(`name: ${result.maps[0].name}`).appendTo($("#edit-map"));
        $(`<div>`).html(`description: ${result.maps[0].description}`).appendTo($("#edit-map"));
        $(`<input type='submit' value='Edit' class='editButton'>`).appendTo($("#edit-map"));
        mymap.setView([0, 0], 0);
      });
  });

  //edit map
  $('#edit-map').on('click', '.editButton', (event) => {
    event.preventDefault();
    $.ajax({
      method: 'GET',
      url: `/maps/edit`,
      data: ``
    })
      .then((result) => {
      });
  });

})




