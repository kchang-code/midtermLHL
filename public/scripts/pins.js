//create new popups for a new pin
const createNewPopUps = (title, image, description) => {
  const $popups = `
        <div id='pin-pop'>
        <div id='popupTitle'>${title}</div>
        <div id='popupImage'>${image}</div>
        <div id='popupDescription'>${description}</div>
        <input type="file"  accept="image/*" name="image" id="file"><br>
        <div id='popupButtons'>
            <input type='submit' value='Edit' class='editButton'/>
            <input type='button' value='Delete' class='deleteButton'/>
        </div>
        </div>
          `;
  return $popups;
}

// DELETE BUTTON FUNCTIONALITY
const onPopupOpen = () => {
  let tempMarker = this;
  // To remove marker on click of delete button in the popup of marker
  $(".deleteButton:visible").click(function () {
    mymap.removeLayer(tempMarker);
  });
}
