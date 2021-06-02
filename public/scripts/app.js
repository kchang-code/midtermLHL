$(document).ready(() => {
  //create new map on web page with leaflef api
  const mymap = L.map("mapid").setView([0, 0], 0);
  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  const tiles = L.tileLayer(tileUrl, { attribution });
  tiles.addTo(mymap);

  //make marker editable
  const layerGroup = L.layerGroup().addTo(mymap);

  //login is handle by the html

  // create pins
  // CREATE MARKER WHEREVER YOU CLICK
  const markers = mymap.on('click', function (e) {
    let marker = new L.marker(e.latlng).addTo(mymap);
    marker.bindPopup(createNewPopUps());
    marker.on("popupopen", onPopupOpen);
    addMarkerToDB($('#map-edit-id').val(), document.cookie[document.cookie.length - 1], e.latlng.lat, e.latlng.lng);
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

  //view all maps
  viewAllMaps();

  //add maps
  $('#map-form').on('submit', function (event) {
    event.preventDefault();
    loginCheck();
    addMap(this);
    viewLatestMaps();
    $('#title-input').val('');
    $('#description-input').val('');
  });

  //show single map
  $('.square-view-all-maps').on('click', '.map-name', (event) => {
    event.preventDefault();
    //_leaf_id 26 is the base layer of the map, we only want to keep the base layer on screen
    mymap.eachLayer(function (layer) {
      layer._leaflet_id !== 26 ? mymap.removeLayer(layer) : '';
    });
    $('#favourite-map-heart').css("color", "red");
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
        }).then((result) => {
          //console.log(result);
          let lat = 0;
          let lng = 0;
          for (const row of result.pins) {
            lat = row.lat;
            lng = row.lng;
            let marker_map = new L.marker({ lat, lng }).addTo(mymap);
            marker_map.bindPopup(createNewPopUps(row.title, row.image, row.description));
            marker_map.on("popupopen", onPopupOpen);
          }
          mymap.setView([0, 0], 0);
        })
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
  $('.square-fav-maps').on('click', '.favouriteMap-name', (event) => {
    event.preventDefault();
    $.ajax({
      method: 'GET',
      url: `/favourites/${$(event.target).val()}`
    })
      .then((result) => {
        favoriteViewAllMaps(result);
        mymap.setView([0, 0], 0);
      });
  });

  //favourtie map
  $('#favourite-map-heart').on('click', (event) => {
    event.preventDefault();
    let color = $('#favourite-map-heart').css("color");
    let unique_id = `${document.cookie[document.cookie.length - 1]}-${$('#map-edit-id').val()}`;
    if (color === 'rgb(255, 0, 0)') {
      $.ajax({
        method: 'POST',
        url: `/favourites`,
        data: { user_id: document.cookie[document.cookie.length - 1], map_id: $('#map-edit-id').val() }
      })
        .then((result) => {
          console.log(result);
          $(`<div id='${unique_id}'>`).html($('#map-edit-name').val()).appendTo($(".square-fav-maps"));
          $('#favourite-map-heart').css("color", "blue");
        });
    } else {
      $.ajax({
        method: 'DELETE',
        url: `/favourites`,
        data: { user_id: document.cookie[document.cookie.length - 1], map_id: $('#map-edit-id').val() }
      })
        .then((result) => {
          $(`#${unique_id}`).remove();
          $('#favourite-map-heart').css("color", "red");
        });
    }
  });
})
