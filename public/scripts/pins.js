//create new popups for a new pin
const createNewPopUps = (title, image, description) => {
  const $popups = `
        <div id='pin-pop'>
        <input id='popupTitle' value='${title}'>
        <input id='popupImage' value='${image}' type="file"  accept="image/*" name="image">
        <input id='popupDescription' value='${description}'>
        <div id='popupButtons'>
            <input type='submit' value='Edit' class='editButton'/>
            <input type='button' value='Delete' class='deleteButton'/>
        </div>
        </div>
          `;
  return $popups;
}

//add a marker to db
const addMarkerToDB = (mapID, userID, pinLat, pinLng) => {
  $.ajax({
    method: 'POST',
    url: `/pins/`,
    data: {
      title: 'title',
      description: 'description',
      image: '/',
      map_id: mapID,
      user_id: userID,
      lat: pinLat,
      lng: pinLng
    }
  }).then((result) => {
    console.log(result);
  })
}

//delete marker
const deleteMarker = (mapID, userID, pinLat, pinLng) => {
  $.ajax({
    method: 'POST',
    url: `/pins/`,
    data: {
      title: 'title',
      description: 'description',
      image: '/',
      map_id: mapID,
      user_id: userID,
      lat: pinLat,
      lng: pinLng
    }
  }).then((result) => {
    console.log(result);
  })
}
