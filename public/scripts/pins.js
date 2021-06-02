//create new popups for a new pin
// const createNewPopUps = (title, image, description, lat, lng) => {
//   const $popups = `
//         <div id='pin-pop'>
//         <img id='output' src="/images/Default.png"><br>
//         <input id='popupTitle' value='${title}'>
//         <input id='popupImage' value='${image}' type="file"  accept="image/*" name="image">
//         <input id='popupDescription' value='${description}'>
//         <input id='lat' value='${lat}' type='hidden'>
//         <input id='lng' value='${lng}' type='hidden'>
//         <div id='popupButtons'>
//             <input type='submit' value='Edit' class='editButton'>
//             <input type='button' value='Delete' class='deleteButton'>
//         </div>
//         </div>
//           `;
//   return $popups;
// }



const createNewPopUps = (title, image, description, lat, lng) => {
  const $popups = `
        <div id='pin-pop'>
        <input id='popupTitle' value='${title}'>
        <img id="output" width="200" height="200" src="/images/Default.png" />
        <input id='popupDescription' value='${description}'>
        <input type="file"  accept="image/*" name="images" id="file"  onchange="loadFile(event)">
        <input id='lat' value='${lat}' type='hidden'>
        <input id='lng' value='${lng}' type='hidden'>
        <div id='popupButtons'>
        <input type='submit' value='Edit' class='editButton'>
        <input type='button' value='Delete' class='deleteButton'>
        </div>
        </div>
        `;
        return $popups;
      }






{/* <p><input type="file"  accept="image/*" name="image" id="file"  onchange="loadFile(event)" style="display: none;"></p>
  <p><label for="file" style="cursor: pointer;">Upload Image</label></p>
  <p><img id="imageSpot" width="200" /></p>

  <script>
  var loadFile = function(event) {
    var image = document.getElementById('imageSpot');
    image.src = URL.createObjectURL(event.target.files[0]);
  };
  </script> */}

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
const editMarker = (editPinData) => {
  $.ajax({
    method: 'PUT',
    url: `/pins/edit`,
    data: editPinData
  }).then((result) => {
    console.log(result);
  })
}

//delete marker
const deleteMarker = (pinData) => {
  $.ajax({
    method: 'DELETE',
    url: `/pins/`,
    data: pinData
  }).then((result) => {
    console.log(result);
  })
}

