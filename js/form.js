'use strict';

(function () {

  window.autoFill = function () {
  var x = document.getElementById('type').value;
  var price = document.getElementById('price');
    if (x === 'bungalo') {
      price.min = '0';
      price.placeholder = 'от 0';
    } else if (x === 'flat') {
      price.min = '1000';
      price.placeholder = 'от 1000';
    } else if (x === 'house') {
      price.min = '5000';
      price.placeholder = 'от 5000';
    } else if (x === 'palace') {
      price.min = '10000';
      price.placeholder = 'от 10000';
    }
  };

  window.autoFillTime = function () {
  var timeIn = document.getElementById('timein').value;
  var timeOut = document.getElementById('timeout');

  if (timeIn === '12:00') {
    timeOut.value = '12:00';
  } else if (timeIn === '13:00') {
    timeOut.value = '13:00';
  } else if (timeIn === '14:00') {
    timeOut.value = '14:00';
  }
  };

  window.set.formReset.addEventListener('click', function () {
    window.set.map.classList.add('map--faded');
    window.set.form.classList.add('ad-form--disabled');
});

})();
