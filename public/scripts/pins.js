//create new popups for a new pin
const createNewPopUps = (title, image, description) => {
  const $popups = `
        <div id='pin-pop'>
        <input id='popupTitle' value='${title}'>
        <input id='popupImage' value='${image}' type="file"  accept="image/*" name="image">
        <input id='popupDescription' value='${description}'>
        <div id='popupButtons'>
            <input type='submit' value='Edit' class='editButton'/>
            <button onclick="clearMarker('${id}')">Clear Marker</button>
        </div>
        </div>
          `;
  return $popups;
}

// DELETE BUTTON FUNCTIONALITY
const onPopupOpen = () => {
  let tempMarker = this;
  // To remove marker on click of delete button in the popup of marker
  console.log('im here');
  $(".deleteButton").click(function () {
    layerGroup.removeLayer(tempMarker);
  });
}

function createMarker(coords, markers, mymap) {
  var id
  if (markers.length < 1) id = 0
  else id = markers[markers.length - 1]._id + 1
  var popupContent =
    `<div id='pin-pop'>
      <input id='popupTitle' value='$title'>
      <input id='popupImage' value='image' type="file" accept="image/*" name="image">
      <input id='popupDescription' value='description'>
      <div id='popupButtons'>
        <input type='submit' value='Edit' class='editButton' />
        <button id= 'delete-marker' onclick="clearMarker('${id}')">Clear Marker</button>
      </div>
    </div>`;
  myMarker = L.marker(coords, {
    draggable: false
  });
  myMarker._id = id
  var myPopup = myMarker.bindPopup(popupContent, {
    closeButton: false
  });
  mymap.addLayer(myMarker)
  markers.push(myMarker)
  console.log(markers);
  return markers;
}

function clearMarker(id) {
  // console.log(markers)
  var new_markers = []
  // markers.forEach(function (marker) {
  //   if (marker._id == id) map.removeLayer(marker)
  //   else new_markers.push(marker)
  // })
  map.removeLayer(id)
  // markers = new_markers
}
