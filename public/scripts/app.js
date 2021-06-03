$(document).ready(() => {
  //create new map on web page with leaflef api
  const mymap = L.map("mapid").setView([20, 0], 2.25);
  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  // const tiles = L.tileLayer(tileUrl, { attribution });
  const tiles = L.tileLayer(tileUrl, { noWrap: true, attribution });
  tiles.addTo(mymap);

  //login is handle by the html

  // create marker
  mymap.on('click', function (e) {
    let marker = new L.marker(e.latlng).addTo(mymap);
    addMarkerToDB($('#map-edit-id').val(), document.cookie[document.cookie.length - 1], parseFloat(e.latlng.lat).toFixed(2), parseFloat(e.latlng.lng).toFixed(2));
    $('.square-user-contributions').empty();
    viewAllContributeMaps(document.cookie[document.cookie.length - 1]);
    marker.bindPopup(createNewPopUps('Insert Title Here', '/images/Default.png', 'Insert Description Here', e.latlng.lat, e.latlng.lng));
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
      $('.square-user-contributions').empty();
      viewAllContributeMaps(document.cookie[document.cookie.length - 1]);
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
        lat: parseFloat($('#lat').val()).toFixed(2),
        lng: parseFloat($('#lng').val()).toFixed(2)
      };
      let map_name = $('#map-edit-name').val();
      editMarker(editPinData, map_name);
    });
  }

  //view all three maps with promises
  const user_id = document.cookie[document.cookie.length - 1];
  viewAllMaps(user_id);

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
          mymap.setView([20, 0], 2.25);
        })
      });
  });


  // back to create map button
  $('.create-map-button').on("click", () => {
    $('#edit-map').hide();
    $('#form').show();
    $('.create-map-button').hide();
  });

  //edit map
  $('#edit-map').on('click', '.editButton', (event) => {
    event.preventDefault();
    loginCheck();
    let mapData = { id: $('#map-edit-id').val(), name: $('#map-edit-name').val(), description: $('#map-edit-description').val(), image: $('#popupImage').val() };
    editMap(mapData);
  });

  //favourite map button
  $('#favourite-map-heart').on('click', (event) => {
    event.preventDefault();
    let color = $('#favourite-map-heart').css("color");
    if (color === 'rgb(255, 0, 0)') {
      // console.log('success');
      $.ajax({
        method: 'POST',
        url: `/favourites`,
        data: { user_id: document.cookie[document.cookie.length - 1], map_id: $('#map-edit-id').val() }
      })
        .then((result) => {
          console.log(result);
          $('.square-fav-maps').empty();
          refreshAllFavouriteMaps(document.cookie[document.cookie.length - 1]);
          $('#favourite-map-heart').css("color", "blue");
        });
    } else {
      $.ajax({
        method: 'DELETE',
        url: `/favourites`,
        data: { user_id: document.cookie[document.cookie.length - 1], map_id: $('#map-edit-id').val() }
      })
        .then((result) => {
          $('.square-fav-maps').empty();
          refreshAllFavouriteMaps(document.cookie[document.cookie.length - 1]);
          $('#favourite-map-heart').css("color", "red");
        });
    }
  })
});
