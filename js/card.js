'use strict';

(function () {

  var createElementCard = function (newElement) {
    var card = window.set.cardTemplate.cloneNode(true);
    card.querySelector('img').src = newElement.autor.avatar;
    card.querySelector('.popup__title').textContent = newElement.offer.title;
    card.querySelector('popup__text--address').textContent = newElement.offer.address;
    card.querySelector('popup__text--price').textContent = newElement.offer.price + '╜/ночь';
    card.querySelector('.popup__type').textContent = newElement.offer.type;
    card.querySelector('.popup__text--capacity').textContent = newElement.offer.rooms
      + ' комнаты для' + newElement.offer.guests + ' гостей.';
    card.querySelector('.popup__text--time').textContent = 'Заезд после '
      + newElement.offer.checkin + ', выезд до ' + newElement.offer.checkout;
    // card.querySelector('.popup__photos').content.querySelector('img').src = ;

    return card;
  }


  var renderCards = function (cards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < cards.length; i++) {
      var newElement = createElementCard(cards[i]);

      fragment.appendChild(newElement);
    }

    window.set.map.appendChild(fragment);
  };

  window.card = {
    renderCards: renderCards
  };

})();
