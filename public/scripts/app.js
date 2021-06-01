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
  mymap.on('click', function (e) {
    let marker = new L.marker(e.latlng).addTo(layerGroup);
    marker.bindPopup(createNewPopUps());
    marker.on("popupopen", onPopupOpen);
    return marker;
  });

  //view all maps
  viewAllMaps();

  //add maps
  $('#map-form').on('submit', function (event) {
    event.preventDefault();
    //authentication font-end
    if (!document.cookie) {
      alert("Hello! Please login first!!");
      afterClick();
    }
    addMap(this);
    viewLatestMaps();
    $('#title-input').val('');
    $('#description-input').val('');
  });

  console
  //show single map
  $('.square-view-all-maps').on('click', '.map-name', (event) => {
    event.preventDefault();
    //initialize the map div for viewing
    layerGroup.clearLayers();
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
          let lat = 0;
          let lng = 0;
          for (const row of result.pins) {
            lat = row.lat;
            lng = row.lng;
            let marker_map = new L.marker({ lat, lng }).addTo(layerGroup);
            marker_map.bindPopup(createNewPopUps(row.title, row.image, row.description));
          }
          mymap.setView([0, 0], 0);
        })
      });
  });

  //edit map
  $('#edit-map').on('click', '.editButton', (event) => {
    event.preventDefault();
    //authentication font-end
    if (!document.cookie) {
      alert("Hello! Please login first!!");
      afterClick();
    }
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




