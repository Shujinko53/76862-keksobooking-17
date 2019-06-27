(function () {

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
})();
