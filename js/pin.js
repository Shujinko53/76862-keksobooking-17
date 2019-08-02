'use strict';

(function () {

  var map = document.querySelector('.map');
  var templateContent = document.querySelector('template').content;
  var mapCard;
  var mapCardClose;
  var mapCardTemplate = templateContent.querySelector('.map__card');
  var pinsBlock = map.querySelector('.map__pins');
  var pinsSelector = '.map__pin:not(.map__pin--main)';
  var pins = pinsBlock.querySelectorAll(pinsSelector);
  var wasFirstRender = false;

  var renderPin = function (data, template) {
    var pin = template.cloneNode(true);
    var img = pin.querySelector('img');
    pin.style.left = data.location.x + 'px';
    pin.style.top = data.location.y + 'px';
    img.src = data.author.avatar;
    img.alt = data.offer.title;
    return pin;
  };

  var setPinsClass = function (target) {
    pins.forEach(function (elem) {
      elem.className = 'map__pin' + (target && elem === target ? ' map__pin--active' : '');
    });
  };

  var closePopupClickHandler = function () {
    mapCard.classList.add('hidden');
    setPinsClass();
  };
  var closePopupKeydownHandler = function (evt) {
    if (window.utils.isPressEsc(evt)) {
      closePopupClickHandler();
    }
  };

  /* Показ объявлений по клику на метки */
  var addPinListener = function (data, target) {
    setPinsClass(target);
    mapCard.innerHTML = window.renderAnnouncement(data, mapCardTemplate).innerHTML;
    mapCard.classList.remove('hidden');
    mapCard.querySelector('.popup__close').addEventListener('click', closePopupClickHandler);
  };

  window.pin = {

    render: function (workData) {

      if (wasFirstRender) {
        mapCard.remove();
      }

      pins.forEach(function (elem) {
        pinsBlock.removeChild(elem);
      });

      var pinsFragment = document.createDocumentFragment();
      workData.forEach(function (elem) {
        pinsFragment.appendChild(renderPin(elem, templateContent.querySelector('.map__pin')));
      });
      pinsBlock.appendChild(pinsFragment);
      pins = pinsBlock.querySelectorAll(pinsSelector);

      if (!Object.entries(workData).length) {
        return false;
      }

      if (!wasFirstRender) {
        window.utils.addClassAll(pins, 'hidden');
      }

      map.insertBefore(window.renderAnnouncement(workData[0], mapCardTemplate), map.querySelector('.map__filters-container'));
      mapCard = map.querySelector('.map__card');
      wasFirstRender = true;
      mapCardClose = mapCard.querySelector('.popup__close');

      closePopupClickHandler();

      return data;
    },

    activate: function () {
      mapCardClose.addEventListener('click', closePopupClickHandler);
      document.addEventListener('keydown', closePopupKeydownHandler);
      window.utils.removeClassAll(pins, 'hidden');
    },

    deactivate: function () {
      closePopupClickHandler();
      mapCardClose.removeEventListener('click', closePopupClickHandler);
      document.removeEventListener('keydown', closePopupKeydownHandler);
      window.utils.addClassAll(pins, 'hidden');
    },

    closePopupClickHandler: closePopupClickHandler,
    addPinListener: addPinListener,
    map: map
  };
})();
