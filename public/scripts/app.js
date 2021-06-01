//create maps in the view all maps
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

//view all maps
const viewAllMaps = () => {
  $.ajax({
    method: "GET",
    url: "/maps"
  }).done((maps) => {
    createMaps(maps);
  })
}

//view all maps
const viewLatestMaps = () => {
  $.ajax({
    method: "GET",
    url: "/maps/last"
  }).done((maps) => {
    createMaps(maps);
  })
}

//add a map to the database
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

//view single map
const viewSingleMap = (result) => {
  $('#edit-map').empty('');
  // console.log(result.maps[0].description);
  const $map = `
    <div>
      <input id='map-edit-id' type="hidden" name="id" value='${result.maps[0].id}'>
      <input id='map-edit-name' name='name' value='${result.maps[0].name}'>
    </div>
    <div>
      <input id='map-edit-description' name='description' value="${result.maps[0].description}">
    </div>
    <input type='submit' value='Edit' class='editButton'>
  `;
  $(`<div>`).html($map).appendTo($("#edit-map"));
}

//create new popups for a new pin
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


//main function
$(document).ready(() => {


  //*****maps api starts here*****
  //  NEW MAP
  const mymap = L.map("mapid").setView([51.505, -0.09], 13);
  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const tiles = L.tileLayer(tileUrl, { attribution });
  tiles.addTo(mymap);
  //make marker editable
  var layerGroup = L.layerGroup().addTo(mymap);

  // CREATE MARKER WHEREVER YOU CLICK
  const markers = mymap.on('click', function (e) {
    let marker = new L.marker(e.latlng).addTo(layerGroup);
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


  //*****ajax call starts here*****
  //login is handle by the html

  //view all maps
  viewAllMaps();

  //add maps
  $('#map-form').on('submit', function (event) {
    event.preventDefault();
    //authentication font-end
    if (!document.cookie) {
      alert("Hello! Please login first!!");
    }
    addMap(this);
    viewLatestMaps();
    $('#title-input').val('');
    $('#description-input').val('');
  });

  //create marker on read single map



  //show single map
  $('.square-view-all-maps').on('click', '.map-name', (event) => {
    event.preventDefault();
    layerGroup.clearLayers();
    $.ajax({
      method: 'GET',
      url: `/maps/${$(event.target).val()}`,
    })
      .then((result) => {
        //start reading pins for specific map
        viewSingleMap(result);
        $.ajax({
          method: 'GET',
          url: `/pins/${$('#map-edit-id').val()}`,
        })
          .then((result) => {
            // console.log(result);
            let lat = 0;
            let lng = 0;
            console.log(result.pins);
            for (const row of result.pins) {
              // console.log(result[row]);
              lat = row.lat;
              lng = row.lng;
              new L.marker({ lat, lng }).addTo(layerGroup);
            }
            mymap.setView([0, 0], 0);
          })
      });
  });

  //edit map
  $('#edit-map').on('click', '.editButton', (event) => {
    event.preventDefault();
    console.log(document.cookie);
    //authentication font-end
    if (!document.cookie) {
      alert("Hello! Please login first!!");
      afterClick();
    }
    let mapData = { id: $('#map-edit-id').val(), name: $('#map-edit-name').val(), description: $('#map-edit-description').val() };
    // let passData = JSON.parse(mapData);
    $.ajax({
      method: 'PUT',
      url: `/maps/edit`,
      data: mapData
    })
      .then((result) => {
        //pass -_- do nothing at all

      });
  });

})




