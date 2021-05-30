const viewAllMaps = () => {
  //view all maps
  $.ajax({
    method: "GET",
    url: "/maps"
  }).done((maps) => {
    for (const i in maps) {
      console.log(typeof maps[i]);
      for (const a in maps[i]) {
        $("<div id='user-file'>").html('<div>' + maps[i][a].name + '</div><div><i class="fas fa-heart fa-lg"></i></div>').appendTo($(".square-view-all-maps"));
      }
    }
  }
  );
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
    viewAllMaps();
    $('#title-input').val('');
    $('#description-input').val('');
  });

})




