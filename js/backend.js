'use strict';

(function () {
  window.backend = {

    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      var URL = 'https://js.dump.academy/keksobooking/data';

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          var data = xhr.response.slice(0, 5);
          onLoad(data);
        } else {
          onError(xhr.status);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться' + xhr.timeout);
      });

      xhr.open('GET', URL);

      xhr.send();
    }
  };

})();
