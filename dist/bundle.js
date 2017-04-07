/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = addEvent;
/* harmony export (immutable) */ __webpack_exports__["b"] = showSearchPagination;
function addEvent(elem, event, callback) {
	if( elem != null && typeof elem != 'undefined' ){
    if (elem.addEventListener) {
        elem.addEventListener(event, callback, false)
    } else if (elem.attachEvent) {
        elem.attachEvent('on' + event, callback);
    } else {
        elem['on' + event] = callback;
    }
	}
}

function showSearchPagination( limit, totalResults ){
	let
		pag = '<nav><ul class="pagination">',
		url = window.location.href,
		queryString = $_GET,
		currentPage = (typeof $_GET['page'] == 'undefined') ? 1 : parseInt($_GET['page']),
		cssClass = '',
		totalLinks = 5,
		totalPages = Math.ceil( totalResults / limit ),
		start = ( (currentPage - totalLinks) > 0 ) ? (currentPage - totalLinks) : 1,
		end = ( (currentPage + totalLinks) < totalPages ) ? (currentPage + totalLinks) : totalPages;

	for(let k of Object.keys(queryString)){
		if( k == "" )
			delete queryString[k];
	}

	if( window.location.search != "" )
		url = url.replace(window.location.search, '?');
	else
		url = url + '?';

	/// First page
	queryString.page = 1;
	if( currentPage == 1 ){
		pag += `<li class="disabled"><a><i class="fa fa-angle-double-left"></i></a></li>`;
	} else {
		pag += `<li><a href="${url + queryString.query()}"><i class="fa fa-angle-double-left"></i></a></li>`;
	}

	/// Previous page
	if( currentPage == 1 ){
		queryString.page = 1;
		pag += `<li class="disabled"><a><i class="fa fa-angle-left"></i></a></li>`;
	} else {
		queryString.page = currentPage - 1;
		pag += `<li><a href="${url + queryString.query()}"><i class="fa fa-angle-left"></i></a></li>`;
	}

	if( start > 1 ){
		queryString.page = 1;
		pag += `<li><a href="${url + queryString.query()}">1</a></li>`;
		pag += `<li class="disabled"><a>...</a></li>`;
	}

	for(let i = start; i <= end; i++){
		cssClass = (currentPage == i) ? ' class="active"' : '';
		queryString.page = i;
		pag += `<li${cssClass}><a href="${url + queryString.query()}">${i}</a></li>`;
	}

	if( end < totalPages ){
		queryString.page = totalPages;
		pag += `<li class="disabled"><a>...</a></li>`;
		pag += `<li><a href="${url + queryString.query()}">${totalPages}</a></li>`;
	}

	/// Next page
	if( currentPage == totalPages ){
		pag += `<li class="disabled"><a><i class="fa fa-angle-right"></i></a></li>`;
	} else {
		queryString.page = currentPage + 1;
		pag += `<li><a href="${url + queryString.query()}"><i class="fa fa-angle-right"></i></a></li>`;
	}

	/// Last page
	if( currentPage == totalPages ){
		pag += `<li class="disabled"><a><i class="fa fa-angle-double-right"></i></a></li>`;
	} else {
		queryString.page = totalPages;
		pag += `<li><a href="${url + queryString.query()}"><i class="fa fa-angle-double-right"></i></a></li>`;
	}

	pag += '</ul></nav>';

	document.getElementById('searchPagination').innerHTML = pag;
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = validateEmail;
/* harmony export (immutable) */ __webpack_exports__["b"] = validatePhone;
/* harmony export (immutable) */ __webpack_exports__["a"] = validateAll;

/**
 * Contact Page
 */
const firstName = document.querySelector("#InputFirstName");
const lastName = document.querySelector("#InputLastName");
const email = document.querySelector("#InputEmail");
const telefone = document.querySelector("#Phone");
const contactButton = document.querySelector("#contacts-submit");
const comment = document.querySelector('#Comments');

function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePhone(phone)
{
  let re = /^1\d\d(\d\d)?$|^0800 ?\d{3} ?\d{4}$|^(\(0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d\) ?|0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d[ .-]?)?(9|9[ .-])?[2-9]\d{3}[ .-]?\d{4}$/gm;
  return re.test(phone);
}

function validateAll()
{
  if(validatePhone(telefone.value)&&validateEmail(email.value))
  {
    return true;
  }
  else
  {
      if(!validatePhone(telefone.value))
        telefone.style = "border-color : #FB4A4A;";
      if(!validateEmail(email.value))
        email.style = "border-color :#FB4A4A ;";
      return false;
  }
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__validate__ = __webpack_require__(1);



'use strict';

/// Get query params
window.$_GET = window.location.search.substr(1).split('&').reduce(function (o, i) {
  let u = decodeURIComponent,
      [k, v] = i.split('=');

  o[u(k)] = v && u(v);

  return o;
}, {});

/// UI options
var hamburgerBtn = document.querySelector('.hamburger'),
    overlay = document.querySelector('.overlay'),
    isClosed = false;

function hamburger_cross() {
  if (isClosed == true) {
    overlay.style.display = 'none';
    hamburgerBtn.classList.remove('is-open');
    hamburgerBtn.classList.add('is-closed');
    isClosed = false;
  } else {
    overlay.style.display = 'block';
    hamburgerBtn.classList.remove('is-closed');
    hamburgerBtn.classList.add('is-open');
    isClosed = true;
  }
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__event__["a" /* addEvent */])(hamburgerBtn, 'click', hamburger_cross);
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__event__["a" /* addEvent */])(document.querySelector('[data-toggle="offcanvas"]'), 'click', function () {
  document.querySelector('#wrapper').classList.toggle('toggled');
});
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__event__["a" /* addEvent */])(document.querySelector('.btn-goback'), 'click', function () {
  window.history.back();
});

function showSearchResults(json) {
  let temp = '',
      i = 1;

  if (json.data.movies && json.data.movies.length > 0) {

    for (let value of json.data.movies) {
      // Replace image if not avaible
      if (value.large_cover_image == 'N/A') value.large_cover_image = 'https://placeholdit.imgix.net/~text?txtsize=18&txt=Poster+n%C3%A3o+dispon%C3%ADvel&w=250&h=360&txttrack=0';

      if (i == 1) {
        temp += '<div class="row">';
      }
      temp += `<div class="col-md-3"><div class="thumbnail"><a href="film.html?id=${value.id}"><img src="${value.large_cover_image}" alt="${value.title}"></a><div class="caption"><h2>${value.title}</h2><p><b>Year:</b> ${value.year}<br><b>IMDb:</b> <a href="http://www.imdb.com/title/${value.imdb_code}/" target="_balnk">View page</a></p></div></div></div>`;
      if (i == 4) {
        temp += '</div>';
        i = 0;
      }
      i++;
    }

    // Show pagination
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__event__["b" /* showSearchPagination */])(json.data.limit, json.data.movie_count);
  } else {
    temp = '<h3 class="text-danger text-center">Não há resultados!</h3>';
  }

  document.getElementById('searchResults').innerHTML = temp;

  // Hide loading
  document.getElementById('loader').style.display = "none";
}

function showMovieData(json) {
  let $filmTitle = document.querySelector('.film-title'),
      $filmYear = document.querySelector('.film-year'),
      $filmImdb = document.querySelector('.film-imdb'),
      $filmGenres = document.querySelector('.film-genres'),
      $filmCast = document.querySelector('.film-cast'),
      $filmPoster = document.querySelector('.film-poster'),
      $filmPlot = document.querySelector('.film-plot'),
      $filmLang = document.querySelector('.film-lang'),
      movie = json.data.movie;

  $filmTitle.innerHTML = movie.title;
  $filmYear.innerHTML = movie.year;
  $filmImdb.innerHTML = `<a href="http://www.imdb.com/title/${movie.imdb_code}/" target="_balnk">View page</a>`;
  $filmGenres.innerHTML = movie.genres.map(function (val) {
    return ` <a href="genre.html?genre=${val}">${val}</a>`;
  });
  $filmPlot.innerHTML = movie.description_full;
  $filmLang.innerHTML = movie.language;
  $filmPoster.setAttribute('src', movie.medium_cover_image);
  $filmPoster.setAttribute('alt', movie.title);

  if (movie.cast) {
    $filmCast.innerHTML = movie.cast.map(function (act) {
      return ` <a href="http://www.imdb.com/name/nm${act.imdb_code}/" target="_blank">${act.name} (${act.character_name})</a>`;
    });
  } else {
    $filmCast.innerHTML = 'N/A';
  }

  // YouTube trailer
  if (movie.yt_trailer_code) {
    document.querySelector('.yt-btn').innerHTML = `<button type="button" class="btn btn-youtube btn-fill" data-yt-code="${movie.yt_trailer_code}"><i class="fa fa-youtube-play"></i> Watch Trailer</button>`;
    yttrailer.create(movie.yt_trailer_code);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__event__["a" /* addEvent */])(document.querySelector('.btn-youtube'), 'click', yttrailer.open);
  }

  // Movie title on title bar
  document.querySelector('title').prepend(`${movie.title} - `);

  // Show torrent list
  let temp = '';
  let download;

  for (let torrent of movie.torrents) {
    download = `magnet:?xt=urn:btih:${torrent.hash}&dn=${encodeURI(movie.title + ' ' + torrent.quality)}&tr=udp://open.demonii.com:1337/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969`;
    temp += `<tr><td>${movie.title}</td><td>${torrent.quality}</td><td>${torrent.peers}</td>`;
    temp += `<td>${torrent.seeds}</td><td>${torrent.size}</td><td><a href="${download}" target="_blank">Download</a></td></tr>`;
  }

  document.querySelector('#tableTorrent tbody').innerHTML = temp;
  document.getElementById('loader').style.display = "none";
}

/**
 * Contact Page
 */
const firstName = document.querySelector("#InputFirstName");
const lastName = document.querySelector("#InputLastName");
const email = document.querySelector("#InputEmail");
const telefone = document.querySelector("#Phone");
const contactButton = document.querySelector("#contacts-submit");
const comment = document.querySelector('#Comments');

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__event__["a" /* addEvent */])(email, "input", emailWhite);
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__event__["a" /* addEvent */])(telefone, "input", telefoneWhite);
function emailWhite() {
  email.style = "border-color: #DDD;";
}
function telefoneWhite() {
  telefone.style = "border-color : #DDD;";
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__event__["a" /* addEvent */])(contactButton, "click", contactButtonActive);
function contactButtonActive() {
  if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__validate__["a" /* validateAll */])() && firstName.value != "" && lastName.value != "" && email.value != "" && telefone.value != "") {
    firstName.value = "";
    lastName.value = "";
    email.value = "";
    telefone.value = "";
    comment.value = "";
    swal({
      title: 'Good job!',
      text: 'Mensagem enviada :D',
      type: 'success',
      confirmButtonText: 'Ok'
    });
  } else if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__validate__["b" /* validatePhone */])() || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__validate__["c" /* validateEmail */])()) {
    swal({
      title: 'Error!',
      text: 'Os campos invalidos estão marcados',
      type: 'error',
      confirmButtonText: 'Ok'
    });
  } else {
    swal({
      title: 'Error!',
      text: 'Todos  os campos devem ser preenchidos',
      type: 'error',
      confirmButtonText: 'Ok'
    });
  }
}

/* ==> yts <==*/

(function (namespace) {
  'use strict';

  var API_URL = "https://yts.ag/api/v2/";

  namespace.createRequest = function (requestURL, requestData, callback) {
    if (typeof callback !== 'function') {
      throw new Error("The callback parameter was not a function");
    }

    if (typeof requestData != 'object') {
      throw new Error("I don't know how to handle " + requestData);
    }

    var xhr = new XMLHttpRequest();
    xhr.open("GET", requestURL + requestData.query(), true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) {
        return;
      }

      if (xhr.status !== 200) {
        throw new Error("Unexpected HTTP Status Code (" + xhr.status + ")");
      }

      callback(JSON.parse(xhr.responseText));
    };
    xhr.send();
  };

  namespace.listMovies = function (requestData, callback) {
    if (typeof callback !== 'function') {
      throw new Error("The callback parameter was not a function");
    }

    if (typeof requestData != 'object') {
      throw new Error("I don't know how to handle " + requestData);
    }

    let requestURL = API_URL + 'list_movies.json?';
    this.createRequest(requestURL, requestData, callback);
  };

  namespace.movieDetails = function (requestData, callback) {
    if (typeof callback !== 'function') {
      throw new Error("The callback parameter was not a function");
    }

    if (typeof requestData != 'object') {
      throw new Error("I don't know how to handle " + requestData);
    }

    let requestURL = API_URL + 'movie_details.json?';
    this.createRequest(requestURL, requestData, callback);
  };
})(window.yts || (window.yts = {}));

var url = window.location.href;

if (url.match(/index/) != null) {
  yts.listMovies({
    sort_by: 'year',
    order_by: 'desc',
    page: typeof $_GET['page'] == 'undefined' ? 1 : $_GET['page']
  }, showSearchResults);
} else if (url.match(/film/) != null) {
  yts.movieDetails({
    movie_id: $_GET['id'],
    with_images: true,
    with_cast: true
  }, showMovieData);
} else if (url.match(/genre/) != null) {
  document.querySelector('title').prepend(`Genre: ${$_GET['genre']} - `);
  document.querySelector('.genre-term').innerHTML = $_GET['genre'];
  yts.listMovies({
    genre: $_GET['genre'],
    page: typeof $_GET['page'] == 'undefined' ? 1 : $_GET['page']
  }, showSearchResults);
} else if (url.match(/search/) != null) {
  document.querySelector('title').prepend(`Search for ${$_GET['q']} - `);
  document.querySelector('.search-term').innerHTML = $_GET['q'];
  yts.listMovies({
    query_term: $_GET['q'],
    page: typeof $_GET['page'] == 'undefined' ? 1 : $_GET['page']
  }, showSearchResults);
}

/***/ })
/******/ ]);