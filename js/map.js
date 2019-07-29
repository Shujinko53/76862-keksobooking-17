'use strict';
(function () {

  var pins;
  var markerHalfWidth = Math.round(window.set.mapPoint.offsetWidth / 2);

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

      var pointX = window.set.mapPoint.offsetLeft - shift.x;
      var pointY = window.set.mapPoint.offsetTop - shift.y;
      var markerX = pointX + markerHalfWidth;
      var markerY = pointY + window.set.PIN_HEIGHT;

      if (markerX < window.set.mapWidth[0]) {
        window.set.mapPoint.style.left = window.set.mapWidth - markerHalfWidth + 'px';
        markerX = window.set.mapWidth[0];
      } else if (markerX > window.set.mapWidth[1]) {
        window.set.mapPoint.style.left = window.set.mapWidth[1] - markerHalfWidth + 'px';
        markerX = window.set.mapWidth[1];
      } else {
        window.set.mapPoint.style.left = pointX + 'px';
      }

      if (markerY < window.set.mapHeight[0]) {
        window.set.mapPoint.style.top = window.set.mapHeight[0] - window.set.PIN_HEIGHT + 'px';
        markerY = window.set.mapHeight[0];
      } else if (markerY > window.set.mapHeight[1]) {
        window.set.mapPoint.style.top = window.set.mapHeight[1] - window.set.PIN_HEIGHT + 'px';
        markerY = window.set.mapHeight[1];
      } else {
        window.set.mapPoint.style.top = pointY + 'px';
      }

      document.getElementById('address').value = markerX + ',' + markerY;
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

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    window.set.mapFilters.classList.remove('hidden');
    window.form.roomNumberChangeHandler();
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.set.filterType.addEventListener('change', function () {
    var filterValue = window.set.filterType.value;

    var filterPins = pins.filter(function (item) {
      if (item.offer.type == filterValue) {
        return item;
      } else if (filterValue === 'any') {
        return item;
      } else {
        return false;
      }
    });

    window.card.removeCard();
    window.pin.removePins();
    window.pin.renderPins(filterPins);
  });

  window.set.filterRooms.addEventListener('change', function () {
    var filterValue = window.set.filterRooms.value;

    var filterPins = pins.filter(function (item) {
      if (item.offer.rooms == filterValue) {
        return item;
      } else if (filterValue === 'any') {
        return item;
      } else {
        return false;
      }
    });

    window.card.removeCard();
    window.pin.removePins();
    window.pin.renderPins(filterPins);
  });

  window.set.filterGuests.addEventListener('change', function () {
    var filterValue = window.set.filterGuests.value;

    var filterPins = pins.filter(function (item) {
      if (item.offer.guests == filterValue) {
        return item;
      } else if (filterValue === 'any') {
        return item;
      } else {
        return false;
      }
    });

    window.card.removeCard();
    window.pin.removePins();
    window.pin.renderPins(filterPins);
  });

  var tempSuccess = document.querySelector('#success');
  var submitButton = document.querySelector('.ad-form__submit');
  var main = document.querySelector('.main');

  submitButton.addEventListener('click', function () {
    main.appendChild(tempSuccess);
  });

})();
