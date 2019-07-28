'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormGroups = adForm.querySelectorAll('fieldset');
  var address = document.querySelector('#address');
  var houseType = document.querySelector('#type');
  var priceField = document.querySelector('#price');

  var addPinCoords = function () {
    address.value = window.pin.getCoords(window.set.mapPoint);
  };

  addPinCoords();

  var houseTypeChangeHandler = function () {
    var price = window.data.HouseMinPrices[houseType.value.toUpperCase()];
    priceField.min = parseInt(price.replace(/ /g, ''), 10);
    priceField.placeholder = price;
  };

  // window.autoFill = function () {
  //   var x = document.querySelector('#type').value;
  //   var price = document.querySelector('#price');
  //   if (x === 'bungalo') {
  //     price.min = '0';
  //     price.placeholder = 'от 0';
  //   } else if (x === 'flat') {
  //     price.min = '1000';
  //     price.placeholder = 'от 1000';
  //   } else if (x === 'house') {
  //     price.min = '5000';
  //     price.placeholder = 'от 5000';
  //   } else if (x === 'palace') {
  //     price.min = '10000';
  //     price.placeholder = 'от 10000';
  //   }
  // };

  /* Соответствие комнат и мест */
  var roomLimits = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };

  var roomOptions;
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var capacityOptions = document.querySelectorAll('#capacity option');

  var roomNumberChangeHandler = function () {
    roomOptions = roomLimits[roomNumber.value];
    capacityOptions.forEach(function (elem) {
      if (roomOptions.indexOf(elem.value) === -1) {
        elem.setAttribute('hidden', '');
      } else {
        elem.removeAttribute('hidden');
      }
    });
    capacityChangeHandler();
  };

  var capacityChangeHandler = function () {
    roomOptions = roomLimits[roomNumber.value];
    if (roomOptions.indexOf(capacity.value) === -1) {
      capacity.setCustomValidity('Число гостей не соответствует ограничениям для данного числа комнат!');
    } else {
      capacity.setCustomValidity('');
    }
  };

  /* Соответствие времени въезда и выезда */
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var syncValues = function (field1, field2) {
    field1.value = field2.value;
  };

  timeIn.addEventListener('change', function () {
    syncValues(timeOut, timeIn);
  });
  timeOut.addEventListener('change', function () {
    syncValues(timeIn, timeOut);
  });

  window.utils.setAttributeAll(adFormGroups, 'disabled');

  roomNumber.addEventListener('change', roomNumberChangeHandler);
  capacity.addEventListener('change', capacityChangeHandler);
  houseType.addEventListener('change', houseTypeChangeHandler);

  /* Сброс формы по кнопке reset*/
  window.set.formReset.addEventListener('click', function () {
    window.set.map.classList.add('map--faded');
    window.set.form.classList.add('ad-form--disabled');
    window.set.mapFilters.classList.add('hidden');
    window.card.removeCard();
    window.pin.removePins();
    window.set.mapPoint.style.left = window.set.initLeft;
    window.set.mapPoint.style.top = window.set.initTop;

    window.set.setAttributeAll(adFormGroups, 'disabled');
    window.set.filtersSelects.forEach(function (elem) {
      elem.value = 'any';
    });
    window.set.filterFeatures.forEach(function (elem) {
      elem.checked = false;
    });
    window.set.form.reset();
    addPinCoords();
  });

  window.form = {
    roomNumberChangeHandler: roomNumberChangeHandler
  };

})();
