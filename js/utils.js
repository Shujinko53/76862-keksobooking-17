'use strict';
/* Служебные функции */

(function () {

  window.utils = {

    /* Добавление атрибута элементам коллекции */
    setAttributeAll: function (elements, attribute, value) {
      elements.forEach(function (elem) {
        elem.setAttribute(attribute, value || '');
      });
    },

    /* Получение координат элемента */
    getCoords: function (element, posY) {
      var coordX = Math.floor(parseInt(element.style.left, 10) + element.clientWidth / 2);
      var y = element.clientHeight;
      var coordY = Math.floor(parseInt(element.style.top, 10) + (posY === 'bottom' ? y : y / 2));
      return coordX + ', ' + coordY;
    }
  };

})();
