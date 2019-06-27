
    avatars = ['img/avatars/user01.png','img/avatars/user02.png','img/avatars/user03.png',
      'img/avatars/user04.png','img/avatars/user05.png','img/avatars/user06.png','img/avatars/user07.png',
      'img/avatars/user08.png'];
    types = ['palace', 'flat', 'house', 'bungalo'];
    mapElement = document.querySelector('.map__pins');
    x = [0, mapElement.offsetWidth];
    y = [130, 630];
    map = document.querySelector('.map');
    mapPoint = mapElement.querySelector('.map__pin--main');
    pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    PIN_WIDTH = 50;
    PIN_HEIGHT = 70;
    form = document.querySelector('.ad-form');
    formFields = form.querySelectorAll('fieldset');
    filters = document.querySelector('.map__filters');
    filtersSelects = filters.querySelectorAll('select');
    inputAddress = document.querySelector('#address');
