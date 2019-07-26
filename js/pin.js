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
          window.card.removePhoto();
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


  window.pin = {
    renderPins: renderPins,
    removePins: removePins,
    deleteActiveClass: deleteActiveClass,

    /* Получение координат элемента */
    getCoords: function (element, posY) {
      var coordX = Math.floor(parseInt(element.style.left, 10) + element.clientWidth / 2);
      var y = element.clientHeight;
      var coordY = Math.floor(parseInt(element.style.top, 10) + (posY === 'bottom' ? y : y / 2));
      return coordX + ', ' + coordY;
    }
  };

})();
