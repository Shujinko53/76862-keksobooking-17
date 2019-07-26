'use strict';

(function () {

  var avatars = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png',
    'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png',
    'img/avatars/user08.png'];
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var mapElement = document.querySelector('.map__pins');
  var x = [0, mapElement.offsetWidth];
  var y = [130, 630];
  var map = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters-container');
  var mapPoint = mapElement.querySelector('.map__pin--main');
  var initLeft = mapPoint.style.left;
  var initTop = mapPoint.style.top;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var form = document.querySelector('.ad-form');
  var formFields = form.querySelectorAll('fieldset');
  var filters = document.querySelector('.map__filters');
  var filtersSelects = filters.querySelectorAll('select');
  var formReset = document.querySelector('.ad-form__reset');
  var filterType = document.getElementById('housing-type');
  var filterPrice = document.getElementById('housing-price');
  var filterRooms = document.getElementById('housing-rooms');
  var filterGuests = document.getElementById('housing-guests');
  var filterFeatures = filters.querySelectorAll('input');
  var cardTemplate = document.getElementById('card').content.querySelector('.map__card');
  var popupClose = document.querySelector('.popup__close');

  window.set = {
    formReset: formReset,
    mapPoint: mapPoint,
    initLeft: initLeft,
    initTop: initTop,
    map: map,
    mapFilters: mapFilters,
    mapElement: mapElement,
    form: form,
    filtersSelects: filtersSelects,
    pinTemplate: pinTemplate,
    avatars: avatars,
    types: types,
    formFields: formFields,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    mapWidth: x,
    mapHeight: y,
    filterType: filterType,
    filterPrice: filterPrice,
    filterRooms: filterRooms,
    filterGuests: filterGuests,
    filterFeatures: filterFeatures,
    cardTemplate: cardTemplate,
    popupClose: popupClose,

    /* Добавление атрибута элементам коллекции */
    setAttributeAll: function (elements, attribute, value) {
      elements.forEach(function (elem) {
        elem.setAttribute(attribute, value || '');
      });
    }
  };

})();
