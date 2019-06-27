mapPoint.addEventListener('mousedown', function(evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  }

  var onMouseMove = function(moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    if (startCoords.y > 130 && startCoords.y < 630) {
      mapPoint.style.top = (mapPoint.offsetTop - shift.y) + 'px';
    }
    if (startCoords.x > 350 && startCoords.x < 1540) {
    mapPoint.style.left = (mapPoint.offsetLeft - shift.x) + 'px';
  }

    document.getElementById('address').value = startCoords.x + ',' + startCoords.y;
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');

    for(var i = 0; i < formFields.length; i++) {
      formFields[i].disabled = false;
    };

    for(var i = 0; i < filtersSelects.length; i++) {
      filtersSelects[i].disabled = false;
    };

    document.getElementById('address').value = startCoords.x + ',' + startCoords.y;

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
