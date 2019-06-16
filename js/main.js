 // ------- 1-ый пункт задания --------
var avatar = ['img/avatars/user01.png','img/avatars/user02.png','img/avatars/user03.png',
  'img/avatars/user04.png','img/avatars/user05.png','img/avatars/user06.png','img/avatars/user07.png',
  'img/avatars/user08.png'];
var type = ['palace', 'flat', 'house', 'bungalo'];
var x = [200, 250];
var y = [300, 350];

var ads = [
  {
    author: avatar[3] ,
    offer: type[3],
    location: (x[1], y[0])
  },
  {
    author: avatar[0] ,
    offer: type[2],
    // location: x[], y[]
  },
  {
    author: avatar[1] ,
    offer: type[1],
    // location: x[], y[]
  },
  {
    author: avatar[5] ,
    offer: type[0],
    // location: x[], y[]
  },
  {
    author: avatar[2] ,
    offer: type[0],
    // location: x[], y[]
  },
  {
    author: avatar[4] ,
    offer: type[1],
    // location: x[], y[]
  },
  {
    author: avatar[6] ,
    offer: type[2],
    // location: x[], y[]
  },
  {
    author: avatar[7] ,
    offer: type[3],
    // location: x[], y[]
  }
];


// ------- 2-ой пункт задания --------
var map = document.querySelector('.map');

map.classList.remove('map--faded');


// ------- 3-ий пункт задания --------

var mapPointList = document.querySelector('.map__pins');
var mapPoint = mapPointList.querySelector('.map__pin');

var renderPoints = function (ad) {
  var pointElement = mapPoint.cloneNode(true);

  pointElement.querySelector('img') = ad.author;

  return pointElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < ads.length; i++) {
  fragment.appendChild(renderPoints(ads[i]));
}
mapPointList.appendChild(fragment);
