'use strict';
(function () {

  var pins;

  var onLoad = function (data) {
    pins = data;
    window.pin.renderPins(data);
  };

  var onError = function () {};

  window.set.mapPoint.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
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
        window.set.mapPoint.style.top = (window.set.mapPoint.offsetTop - shift.y) + 'px';
      }
      if (startCoords.x > 350 && startCoords.x < 1540) {
        window.set.mapPoint.style.left = (window.set.mapPoint.offsetLeft - shift.x) + 'px';
      }

      document.getElementById('address').value = startCoords.x + ',' + startCoords.y;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.set.map.classList.remove('map--faded');
      window.set.form.classList.remove('ad-form--disabled');

      window.backend.load(onLoad, onError);

      for (var i = 0; i < window.set.formFields.length; i++) {
        window.set.formFields[i].disabled = false;
      }

      for (var j = 0; j < window.set.filtersSelects.length; j++) {
        window.set.filtersSelects[j].disabled = false;
      }

      document.getElementById('address').value = startCoords.x + ',' + startCoords.y;

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.set.housingFilter.addEventListener('change', function () {
    var filterValue = window.set.housingFilter.value;

    var filterPins = pins.filter(function (item) {
      if (item.offer.type === filterValue) {
        return item;
      } else {
        return false;
      }
    });
    window.pin.renderPins(filterPins);
  });
// ---
})();
