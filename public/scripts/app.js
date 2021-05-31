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



  })




$('i').on('click',(favourite_maps) =>{
  console.log('click!');
  $.ajax({
    method:"POST",
    url: "/favourites"
  }).done((favorite_maps) => {
    console.log('http call success');
    })
  })
//
$.ajax({
  method: "GET",
  url: "/maps"
}).done((maps) => {
  for (const i in maps) {
    console.log(typeof maps[i]);
    for (const a in maps[i]) {
      $("<div>").text(maps[i][a].name).appendTo($("#view-all-maps"));
    }
  }
});
