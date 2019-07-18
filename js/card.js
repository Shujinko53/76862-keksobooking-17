'use strict';

(function () {

  var mapFiltersContainer = document.querySelector('.map__filters-container');

  var closePopup = function () {
    removeCard();
    window.pin.deleteActiveClass();
  };

  var createElementCard = function (newElement) {
    var card = window.set.cardTemplate.cloneNode(true);

    card.querySelector('img').src = newElement.author.avatar;
    card.querySelector('.popup__title').textContent = newElement.offer.title;
    card.querySelector('.popup__text--address').textContent = newElement.offer.address;
    card.querySelector('.popup__text--price').textContent = newElement.offer.price + '╜/ночь';
    card.querySelector('.popup__type').textContent = newElement.offer.type;
    card.querySelector('.popup__text--capacity').textContent = newElement.offer.rooms
      + ' комнаты для ' + newElement.offer.guests + ' гостей.';
    card.querySelector('.popup__text--time').textContent = 'Заезд после '
      + newElement.offer.checkin + ', выезд до ' + newElement.offer.checkout;
    card.querySelector('.popup__features').type = newElement.offer.features;
    card.querySelector('.popup__description').textContent = newElement.offer.description;
    card.querySelector('.popup__photos').src = newElement.offer.photos;

    if (newElement.offer.type === 'bungalo') {
      card.querySelector('.popup__type').textContent = 'Бунгало';
    } else if (newElement.offer.type === 'flat') {
      card.querySelector('.popup__type').textContent = 'Квартира';
    } else if (newElement.offer.type === 'house') {
      card.querySelector('.popup__type').textContent = 'Дом';
    } else if (newElement.offer.type === 'palace') {
      card.querySelector('.popup__type').textContent = 'Дворец';
    }

    return card;
  };

  var renderCard = function (data) {
    var cardElement = createElementCard(data);
    var popupCloseButton = cardElement.querySelector('.popup__close');

    popupCloseButton.addEventListener('click', function () {
      closePopup();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        closePopup();
      }
    });

    window.set.map.insertBefore(cardElement, mapFiltersContainer);
  };

  var removeCard = function () {
    var card = document.querySelector('.map__card');

    if (card) {
      card.parentNode.removeChild(card);
    }
  };

  window.card = {
    removeCard: removeCard,
    renderCard: renderCard
  };

})();
