
const renderMaps = function (tweetData) {
  for (const tweet of tweetData) {
    let $tweet = createTweetElement(tweet);
    $(".tweet-container").prepend($tweet);
  }
};

const createMaps = function () {
  const $map = `
        <article>
          <header>
              <div class="map-container">
                <a href="">Map name</a>
            </div>
          </footer>
        </article>
        `;
  return $map;
};

$(document).ready(() => {

  //view all maps
  $.ajax({
    method: "GET",
    url: "/maps"
  }).done((maps) => {
    for (const i in maps) {
      console.log(typeof maps[i]);
      for (const a in maps[i]) {
        $("<div id='user-file'>").html('<div>' + maps[i][a].name + '</div><div><input type="button" name="'+maps[i][a].name+'" class="fas fa-heart fa-lg"></div>').appendTo($(".square-view-all-maps"));
      }
    }
  }
  );

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
