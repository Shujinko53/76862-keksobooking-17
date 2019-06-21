var avatars = ['img/avatars/user01.png','img/avatars/user02.png','img/avatars/user03.png',
  'img/avatars/user04.png','img/avatars/user05.png','img/avatars/user06.png','img/avatars/user07.png',
  'img/avatars/user08.png'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var mapElement = document.querySelector('.map__pins');
var x = [0, mapElement.offsetWidth];
var y = [130, 630];
var map = document.querySelector('.map');
var mapPoint = mapElement.querySelector('.map__pin--main');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var form = document.querySelector('.ad-form');
var formFields = form.querySelectorAll('fieldset');
var filters = document.querySelector('.map__filters');
var filtersSelects = filters.querySelectorAll('select');

var createPins = function(count) {
  var mas = [];

  for (var i = 0; i < 8; i++) {
    var item = {
      author: avatars[getRandomNumber([0, avatars.length - 1])],
      offer: {
        title: 'Заголовок объявления',
        type: types[getRandomNumber([0, types.length - 1])]
      },
      location: {
        x: getRandomNumber(x),
        y: getRandomNumber(y)
      }
    }

    mas.push(item);
  }

  return mas;
};

var createElementPin = function(newElement) {
  var pin = pinTemplate.cloneNode(true);
  pin.style.left = newElement.location.x - PIN_WIDTH / 2 + 'px';
  pin.style.top = newElement.location.y - PIN_HEIGHT + 'px';
  pin.querySelector('img').src = newElement.author;
  pin.querySelector('img').alt = newElement.offer.title;

  return pin;
};

var renderPins = function(pins) {
  var fragment = document.createDocumentFragment();

for (var i = 0; i < pins.length; i++) {
  var newElement = createElementPin(pins[i]);

  fragment.appendChild(newElement);
};

mapElement.appendChild(fragment);
};

var getRandomNumber = function(coordinate) {
  var num = Math.floor(coordinate[0] + Math.random() * (coordinate[1] + 1 - coordinate[0]));

  return num;
};

var pins = createPins(8);
renderPins(pins);

mapPoint.addEventListener('click', function( ) {

  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');

  for(var i = 0; i < formFields.length; i++) {
    formFields[i].disabled = false;
  };

  for(var i = 0; i < filtersSelects.length; i++) {
    filtersSelects[i].disabled = false;
  };
});

mapPoint.addEventListener('mouseup', function() {

});
