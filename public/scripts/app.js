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
        lat: parseFloat($('#lat').val()).toFixed(2),
        lng: parseFloat($('#lng').val()).toFixed(2)
      };
      deleteMarker(pinData);
      mymap.removeLayer(tempMarker);
    });
    //edit marker
    $(".editButton").click(function () {
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
  const user_id = 2//Number(document.cookie[document.cookie.length - 1]);
  viewAllMaps(user_id);
  // console.log(user_id);
  //viewAllFavouriteMaps(user_id);

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
    $("#form").hide();
    $('#edit-map').show();
    $(".create-map-button").show();
    $.ajax({
      method: "GET",
      url: `/maps/${$(event.target).val()}`,
    })
      .then((result) => {
        //start reading pins for specific map
        viewSingleMap(result);
        // insertMarker(mymap);
        $.ajax({
          method: 'GET',
          url: `/pins/${$('#map-edit-id').val()}`,
        }).then((result) => {
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

  // back to create map button
  $('.create-map-button').on("click", () => {
    console.log('im here');
    $('#edit-map').hide();
    $('#form').show();
    $('.create-map-button').hide();
  });

  //edit map
  $('#edit-map').on('click', '.editButton', (event) => {
    event.preventDefault();
    loginCheck();
    let mapData = { id: $('#map-edit-id').val(), name: $('#map-edit-name').val(), description: $('#map-edit-description').val() };
    editMap(mapData);
  });

});
