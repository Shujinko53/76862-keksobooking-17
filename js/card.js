'use strict';

(function () {

  var mapFiltersContainer = document.querySelector('.map__filters-container');

  var createElementCard = function (newElement) {
    var card = window.set.cardTemplate.cloneNode(true);

    card.querySelector('img').src = newElement.author.avatar;
    card.querySelector('.popup__title').textContent = newElement.offer.title;
    card.querySelector('.popup__text--address').type = newElement.offer.address;
    card.querySelector('.popup__text--price').type = newElement.offer.price + '╜/ночь';
    card.querySelector('.popup__type').type = newElement.offer.type;
    card.querySelector('.popup__text--capacity').type = newElement.offer.rooms
      + ' комнаты для ' + newElement.offer.guests + ' гостей.';
    card.querySelector('.popup__text--time').type = 'Заезд после '
      + newElement.offer.checkin + ', выезд до ' + newElement.offer.checkout;
    card.querySelector('.popup__features').type = newElement.offer.features;
    card.querySelector('.popup__photos').src = newElement.offer.photo;

    return card;
  };

  var renderCards = function (cards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < cards.length; i++) {
      var newElement = createElementCard(cards[i]);

      fragment.appendChild(newElement);
    }

    window.set.map.insertBefore(fragment, mapFiltersContainer);
  };

  window.card = {
    renderCards: renderCards
  };

})();
