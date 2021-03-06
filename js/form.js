'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormGroups = adForm.querySelectorAll('fieldset');
  var houseType = adForm.querySelector('#type');
  var priceField = adForm.querySelector('#price');

  var houseTypeChangeHandler = function () {
    var price = window.data.HouseMinPrices[houseType.value.toUpperCase()];
    priceField.min = parseInt(price.replace(/ /g, ''), 10);
    priceField.placeholder = price;
  };

  var roomLimits = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };
  var roomOptions;
  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var capacityOptions = adForm.querySelectorAll('#capacity option');

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

  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var syncValues = function (field1, field2) {
    field1.value = field2.value;
  };

  /* Проверка на валидность */
  var submitBtn = adForm.querySelector('.ad-form__submit');
  var checkList = adForm.querySelectorAll('.ad-form input, .ad-form select');
  var invalidBorder = '0 0 2px 2px #ff6547';
  var addInvalidListener = function (elem) {
    var elemChangeHandler = function () {
      elem.style.boxShadow = elem.validity.valid ? 'none' : invalidBorder;
    };
    elem.addEventListener('invalid', elemChangeHandler);
    elem.addEventListener('input', elemChangeHandler);
    if (elem.tagName === 'SELECT') {
      elem.addEventListener('change', elemChangeHandler);
    }
  };


  window.utils.setAttributeAll(adFormGroups, 'disabled');

  houseType.addEventListener('change', houseTypeChangeHandler);
  roomNumber.addEventListener('change', roomNumberChangeHandler);
  capacity.addEventListener('change', capacityChangeHandler);
  timeIn.addEventListener('change', function () {
    syncValues(timeOut, timeIn);
  });
  timeOut.addEventListener('change', function () {
    syncValues(timeIn, timeOut);
  });

  checkList.forEach(function (elem) {
    addInvalidListener(elem);
  });


  window.form = {
    container: adForm,
    address: adForm.querySelector('#address'),
    adGroups: adFormGroups,
    houseTypeChangeHandler: houseTypeChangeHandler,
    roomNumberChangeHandler: roomNumberChangeHandler,
    checkList: checkList,
    submitBtn: submitBtn
  };
})();
