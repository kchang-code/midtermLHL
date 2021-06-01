const createMaps = (maps) => {
  for (const i in maps) {
    for (const a in maps[i]) {
      const $maps = `
        <input  type="submit" class="map-name" name="name" value="${maps[i][a].name}">
        <i class="fas fa-heart fa-lg"></i>
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



//view single map
const viewSingleMap = (result) => {
  $('#edit-map').empty('');
  console.log(result.maps[0].description);
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


// FAVOURITES

const createFavouriteMaps = (favouriteMaps) => {
  for(const i in favouriteMaps) {
    for (const b in favouriteMaps[i]) {
      const $favouriteMaps = `
      <input type= "submit" class="favouriteMap-name" name="favName" value="${favouriteMaps[i][b].name}">
      <i class="fas fa-times-circle fa-lg"></i>
    `;
    $("<div id='user-file'>").html($favouriteMaps).appendTo($(".square-fav-maps"));
    }
  }
}
createFavouriteMaps()

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
const favouriteViewLatestMaps =() => {
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



    console.log('Ive been added to map', e.latlng)


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
    //make sure the like button is red
    $('#favourite-map-heart').css("color","red");
    //**************** error handling *********
    //****************************************
    $.ajax({
      method: 'GET',
      url: `/maps/${$(event.target).val()}`,
    })
      .then((result) => {
        viewSingleMap(result);
        // $('#edit-map').empty('');
        // $(`<div>`).html(`name: ${result.maps[0].name}`).appendTo($("#edit-map"));
        // $(`<div>`).html(`description: ${result.maps[0].description}`).appendTo($("#edit-map"));
        // $(`<input type='submit' value='Edit' class='editButton'>`).appendTo($("#edit-map"));
        mymap.setView([0, 0], 0);
      });
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
        mymap.setView([0,0], 0);
      });
  });



  //edit map
  $('#edit-map').on('click', '.editButton', (event) => {
    event.preventDefault();
    $.ajax({
      method: 'GET',
      url: `/maps/edit`,
      data: {}
    })
      .then((result) => {
      });
  });

  //favourtie map
  $('#favourite-map-heart').on('click', (event) => {
    event.preventDefault();
    let color = $('#favourite-map-heart').css("color");
    console.log(color);
    console.log(document.cookie[document.cookie.length-1]);
    console.log($('#map-edit-id').val());
    let unique_id=`${document.cookie[document.cookie.length-1]}-${$('#map-edit-id').val()}`;
    if (color==='rgb(255, 0, 0)'){
      console.log("BITTFUNK", unique_id)
      console.log('success');
      $.ajax({
        method: 'POST',
        url: `/favourites`,
        data: {user_id:document.cookie[document.cookie.length-1], map_id:$('#map-edit-id').val()}
      })
      .then((result) => {
        console.log(result);
        $(`<div id='${unique_id}'>`).html($('#map-edit-name').val()).appendTo($(".square-fav-maps"));
        $('#favourite-map-heart').css("color","blue");
      });
    }else {
      $.ajax({
        method: 'DELETE',
        url: `/favourites`,
        data: {user_id:document.cookie[document.cookie.length-1], map_id:$('#map-edit-id').val()}
      })
      .then((result) => {
          $(`#${unique_id}`).remove();
          $('#favourite-map-heart').css("color","red");
        });
    }
  });


  // // Delete map
  // $('NO BUTTON YET').on('click', (event) => {
  //   event.preventDefault();
  //   $.ajax({
  //     method: 'DELETE',
  //     url: '/:name',
  //     data: ''
  //   })
  //     .then((result) => {
  //       console.log(req.rows)
  //     })
  // })

})




