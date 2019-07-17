'use strict';

(function () {

  var PIN_ACTIVE_CLASS = 'map__pin--active';

  var setActiveClass = function (evt) {
    var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    allPins.forEach(function (pin) {
      pin.classList.remove(PIN_ACTIVE_CLASS);
    });

    evt.currentTarget.classList.add(PIN_ACTIVE_CLASS);
  };

  var deleteActiveClass = function () {
    var pin = document.querySelector('.' + PIN_ACTIVE_CLASS);

    if (pin) {
      pin.classList.remove(PIN_ACTIVE_CLASS);
    }
  };

  // var createPins = function () {
  //   var mas = [];

  //   for (var i = 0; i < 8; i++) {
  //     var item = {
  //       author: window.set.avatars[getRandomNumber([0, window.set.avatars.length - 1])],
  //       offer: {
  //         title: 'Заголовок объявления',
  //         type: window.set.types[getRandomNumber([0, window.set.types.length - 1])]
  //       },
  //       location: {
  //         x: getRandomNumber(window.set.x),
  //         y: getRandomNumber(window.set.y)
  //       }
  //     };

  //     mas.push(item);
  //   }

  //   return mas;
  // };

  var createElementPin = function (newElement) {
    var pin = window.set.pinTemplate.cloneNode(true);

    pin.style.left = newElement.location.x - window.set.PIN_WIDTH / 2 + 'px';
    pin.style.top = newElement.location.y - window.set.PIN_HEIGHT + 'px';
    pin.querySelector('img').src = newElement.author.avatar;
    pin.querySelector('img').alt = newElement.offer.title;

    return pin;
  };

  var renderPins = function (pins) {
    var map = document.createDocumentFragment();

    pins.forEach(function (pinData) {
      var pinElement = createElementPin(pinData);

      pinElement.addEventListener('click', function (evt) {
        // при клике на пин, проверить есть ли активный класс!

        if (!evt.currentTarget.classList.contains(PIN_ACTIVE_CLASS)) {
          setActiveClass(evt);

          window.card.removeCard();
          window.card.renderCard(pinData);
        }

        // если его нет, то отображаем карточку и информацией
      });

      map.appendChild(pinElement);
    });

    window.set.mapElement.appendChild(map);
  };

  var removePins = function () {
    var notPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    if (notPins) {
      notPins.forEach(function (pin) {
        pin.parentNode.removeChild(pin);
      });
    }
  };

  // var getRandomNumber = function (coordinate) {
  //   var num = Math.floor(coordinate[0] + Math.random() * (coordinate[1] + 1 - coordinate[0]));

  //   return num;
  // };

  // var pins = createPins(8);
  // renderPins(pins);

  window.pin = {
    renderPins: renderPins,
    removePins: removePins,
    deleteActiveClass: deleteActiveClass
  };

})();
