
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
    //request to read map
    console.log('im here');
    $.ajax({
      method: "GET",
      url: "/maps"
    }).done((maps) => {
      for (map of maps) {
        $("<div>").text(map).appendTo($("body"));
      }
    });

  });



