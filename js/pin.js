'use strict';

(function () {

  var createPins = function () {
    var mas = [];

    for (var i = 0; i < 8; i++) {
      var item = {
        author: window.set.avatars[getRandomNumber([0, window.set.avatars.length - 1])],
        offer: {
          title: 'Заголовок объявления',
          type: window.set.types[getRandomNumber([0, window.set.types.length - 1])]
        },
        location: {
          x: getRandomNumber(window.set.x),
          y: getRandomNumber(window.set.y)
        }
      };

      mas.push(item);
    }

    return mas;
  };

  var createElementPin = function (newElement) {
    var pin = window.set.pinTemplate.cloneNode(true);
    pin.style.left = newElement.location.x - window.set.PIN_WIDTH / 2 + 'px';
    pin.style.top = newElement.location.y - window.set.PIN_HEIGHT + 'px';
    pin.querySelector('img').src = newElement.author;
    pin.querySelector('img').alt = newElement.offer.title;

    return pin;
  };

  var renderPins = function (pins) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pins.length; i++) {
      var newElement = createElementPin(pins[i]);

      fragment.appendChild(newElement);
    }

    window.set.mapElement.appendChild(fragment);
  };

  var getRandomNumber = function (coordinate) {
    var num = Math.floor(coordinate[0] + Math.random() * (coordinate[1] + 1 - coordinate[0]));

    return num;
  };

  var pins = createPins(8);
  renderPins(pins);
})();
