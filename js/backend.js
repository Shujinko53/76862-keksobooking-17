'use strict';

(function () {
  var HTTP_OK = 200;
  var HTTP_BAD_REGUEST = 400;
  var HTTP_UNAUTHORIZED = 401;
  var HTTP_NOT_FOUND = 404;
  var HTTP_INTERNAL_ERROR = 500;

  var xhrListener = function (loadHandler, errorHandler, URL, method, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case HTTP_OK:
          loadHandler(xhr.response);
          break;
        case HTTP_BAD_REGUEST:
          error = 'Неверный запрос';
          break;
        case HTTP_UNAUTHORIZED:
          error = 'Пользователь не авторизован';
          break;
        case HTTP_NOT_FOUND:
          error = 'Ничего не найдено';
          break;
        case HTTP_INTERNAL_ERROR:
          error = 'Внутренняя ошибка сервера';
          break;
        default:
          error = 'Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        errorHandler(error);
      }
    });
    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open(method, URL);
    xhr.send(data);
  };


  window.backend = {
    load: function (loadHandler, errorHandler) {
      xhrListener(loadHandler, errorHandler, window.data.Url.LOAD, 'GET', null);
    },

    save: function (data, loadHandler, errorHandler) {
      xhrListener(loadHandler, errorHandler, window.data.Url.SAVE, 'POST', data);
    }
  };
})();
