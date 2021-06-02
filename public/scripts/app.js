//create maps in the view all maps
const createMaps = (maps) => {
  for (const i in maps) {
    for (const a in maps[i]) {
      const $maps = `
        <input  type="submit" class="map-name" name="name" value="${maps[i][a].name}">
      `;
      $("<div id='user-file'>")
        .html($maps)
        .appendTo($(".square-view-all-maps"));
    }
  }
};

//view all maps

const viewAllMaps = () => {
  $.ajax({
    method: "GET",
    url: "/maps",
  }).done((maps) => {
    createMaps(maps);
  });
};

//view single map
const viewSingleMap = (result) => {
  $("#edit-map").empty("");
  console.log(result.maps[0].description);
  const $map = `
    <div class="edit-map-form">
      <h3>Edit Map</h3>
      <input id='map-edit-id' type="hidden" name="id" value='${result.maps[0].id}'>
      <input id='map-edit-name' name='name' value='${result.maps[0].name}'>
      <input id='map-edit-description' name='description' value="${result.maps[0].description}">
      <input type='submit' value='Edit' class='editButton'>
  `;
  $(`<div>`).html($map).appendTo($("#edit-map"));
};

const viewLatestMaps = () => {
  $.ajax({
    method: "GET",
    url: "/maps/last",
  }).done((maps) => {
    createMaps(maps);
  });
};

//add a map to the database

const addMap = (req) => {
  $.ajax({
    method: "POST",
    url: "/maps",
    data: $(req).serialize(),
  }).then(() => {
    console.log("form submitted");
  });
};

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
};

// FAVOURITES

const createFavouriteMaps = (favouriteMaps) => {
  for (const i in favouriteMaps) {
    for (const b in favouriteMaps[i]) {
      const $favouriteMaps = `
      <input type= "submit" class="favouriteMap-name" name="favName" value="${favouriteMaps[i][b].id}">
      <i class="fas fa-times-circle fa-lg"></i>
    `;
      $("<div id='user-file'>")
        .html($favouriteMaps)
        .appendTo($(".square-fav-maps"));
    }
  }
};

// view all favorite maps
const favoriteViewAllMaps = () => {
  $.ajax({
    method: "GET",
    url: "/favourites",
  }).done((favMaps) => {
    createFavouriteMaps(favMaps);
  });
};

// View all latest favourite maps
const favouriteViewLatestMaps = () => {
  $.ajax({
    method: "GET",
    url: "/favourites/last",
  }).done((favMaps) => {
    createFavouriteMaps(favMaps);
  });
};

// Add favourite maps
const favouriteAddMap = (req) => {
  $.ajax({
    method: "POST",
    url: "/favourites",
    data: $(req).serialize(),
  }).then(() => {
    console.log("favorite form submitted");
  });
};

//main function
$(document).ready(() => {
  //create new map on web page with leaflef api
  const mymap = L.map("mapid").setView([0, 0], 0);
  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const tiles = L.tileLayer(tileUrl, { attribution });
  tiles.addTo(mymap);

  //make marker editable
  const layerGroup = L.layerGroup().addTo(mymap);

  //login is handle by the html

  // create pins
  // CREATE MARKER WHEREVER YOU CLICK
  mymap.on('click', function (e) {
    let marker = new L.marker(e.latlng).addTo(mymap);
    addMarkerToDB($('#map-edit-id').val(), document.cookie[document.cookie.length - 1], parseFloat(e.latlng.lat).toFixed(2), parseFloat(e.latlng.lng).toFixed(2));
    marker.bindPopup(createNewPopUps('titleHere', 'imagehere', 'descriptionHere', e.latlng.lat, e.latlng.lng));
    marker.on("popupopen", onPopupOpen);
  });

  // delete marker
  function onPopupOpen() {
    let tempMarker = this;
    // To remove marker on click of delete button in the popup of marker
    $(".deleteButton:visible").click(function () {
      const pinData = {
        map_id: $('#map-edit-id').val(),
        user_id: document.cookie[document.cookie.length - 1],
        lat: $('#lat').val(),
        lng: $('#lng').val()
      };
      console.log('popup open');
      deleteMarker(pinData);
      mymap.removeLayer(tempMarker);
    });
    //edit marker
    $(".editButton").click(function () {
      console.log('edit is clicked');
      const editPinData = {
        title: $('#popupTitle').val(),
        description: $('#popupDescription').val(),
        image: $('#popupImage').val(),
        map_id: $('#map-edit-id').val(),
        user_id: document.cookie[document.cookie.length - 1],
        lat: $('#lat').val(), lng: $('#lng').val()
      };
      editMarker(editPinData);
    });
  }

  //view all maps
  viewAllMaps();

  //add maps
  $("#map-form").on("submit", function (event) {
    event.preventDefault();
    loginCheck();
    addMap(this);
    viewLatestMaps();
    $("#title-input").val("");
    $("#description-input").val("");
  });

  //show single map
  $(".square-view-all-maps").on("click", ".map-name", (event) => {
    event.preventDefault();
    //keep the base layer on screen
    mymap.eachLayer(function (layer) {
      layer._leaflet_id !== 26 ? mymap.removeLayer(layer) : '';
    });
    layerGroup.clearLayers();
    //make sure the like button is red
    $("#favourite-map-heart").css("color", "red");
    $("form").hide();
    $('#edit-map').show();
    $(".create-map-button").show();
    //**************** error handling *********
    //****************************************
    $.ajax({
      method: "GET",
      url: `/maps/${$(event.target).val()}`,
    })
      .then((result) => {
        //start reading pins for specific map
        viewSingleMap(result);
        $.ajax({
          method: 'GET',
          url: `/pins/${$('#map-edit-id').val()}`,
        }).then((result) => {
          //console.log(result);
          let lat = 0;
          let lng = 0;
          for (const row of result.pins) {
            lat = row.lat;
            lng = row.lng;
            let marker_map = new L.marker({ lat, lng }).addTo(mymap);
            marker_map.bindPopup(createNewPopUps(row.title, row.image, row.description, lat, lng));
            marker_map.on("popupopen", onPopupOpen);
          }
          mymap.setView([0, 0], 0);
        })
      });
  });
});

//edit map
$('#edit-map').on('click', '.editButton', (event) => {
  event.preventDefault();
  loginCheck();
  let mapData = { id: $('#map-edit-id').val(), name: $('#map-edit-name').val(), description: $('#map-edit-description').val() };
  editMap(mapData);
});

// SHOW FAVOURITE MAP
$(".square-fav-maps").on("click", ".favouriteMap-name", (event) => {
  event.preventDefault();
  $.ajax({
    method: "GET",
    url: `/favourites/${$(event.target).val()}`,
  }).then((result) => {
    favoriteViewAllMaps(result);
    mymap.setView([0, 0], 0);
  });
});

//favourtie map
$("#favourite-map-heart").on("click", (event) => {
  event.preventDefault();
  let color = $('#favourite-map-heart').css("color");
  let unique_id = `${document.cookie[document.cookie.length - 1]}-${$('#map-edit-id').val()}`;
  if (color === 'rgb(255, 0, 0)') {
    $.ajax({
      method: "POST",
      url: `/favourites`,
      data: {
        user_id: document.cookie[document.cookie.length - 1],
        map_id: $("#map-edit-id").val(),
      },
    }).then((result) => {
      console.log(result);
      $(`<div id='${unique_id}'>`)
        .html($("#map-edit-name").val())
        .appendTo($(".square-fav-maps"));
      $("#favourite-map-heart").css("color", "blue");
    });
  } else {
    $.ajax({
      method: "DELETE",
      url: `/favourites`,
      data: {
        user_id: document.cookie[document.cookie.length - 1],
        map_id: $("#map-edit-id").val(),
      },
    }).then((result) => {
      $(`#${unique_id}`).remove();
      $("#favourite-map-heart").css("color", "red");
    });
  }
});

// back to create map button
$('.create-map-button').on("click", () => {
  $('#edit-map').hide();
  $('form').show();
  $('.create-map-button').hide();
});
