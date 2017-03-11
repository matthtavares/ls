'use strict';

/// Mount a query string
Object.prototype.query = function(){
	let q = '';

	for(let k of Object.keys(this)){
		q += `&${k}=${this[k]}`;
	}

	return q.substr(1);
}

/// AddEventListener
Element.prototype.addEvent = function(event, callback) {
    if (this.addEventListener) {
        this.addEventListener(event, callback, false) 
    } else if (this.attachEvent) {
        this.attachEvent('on' + event, callback); 
    } else {
        this['on' + event] = callback; 
    }
}

/// Get query params
window.$_GET = window.location.search.substr(1).split('&').reduce(function(o, i){
	let
		u = decodeURIComponent,
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
hamburgerBtn.addEvent('click', hamburger_cross);
document.querySelector('[data-toggle="offcanvas"]').addEvent('click', function(){
	document.querySelector('#wrapper').classList.toggle('toggled')
});
document.querySelector('.btn-goback').addEvent('click', function(){
	window.history.back();
});

function showSearchResults( json ){
	let
		temp = '',
		i = 1;

	if( json.data.movie_count > 0 ){

		for(let value of json.data.movies){
			// Replace image if not avaible
			if( value.large_cover_image == 'N/A' )
				value.large_cover_image = 'https://placeholdit.imgix.net/~text?txtsize=18&txt=Poster+n%C3%A3o+dispon%C3%ADvel&w=250&h=360&txttrack=0';

	        if( i == 1 ){
	          temp += '<div class="row">';
	        }
	        temp += `<div class="col-md-3"><div class="thumbnail"><a href="film.html?id=${value.id}"><img src="${value.large_cover_image}" alt="${value.title}"></a><div class="caption"><h2>${value.title}</h2><p><b>Ano:</b> ${value.year}<br><b>IMDb:</b> ${value.imdb_code}</p></div></div></div>`;
	        if( i == 4 ){
	          temp += '</div>';
	          i = 0;
	        }
	        i++;
		}

		// Show pagination
		showSearchPagination(json.data.movie_count);

	} else {
		temp = '<h3 class="text-danger text-center">Não há resultados!</h3>';
	}

	document.getElementById('searchResults').innerHTML = temp;

	// Hide loading
	document.getElementById('loader').style.display = "none";
}

function showSearchPagination( totalResults ){
	let
		pag = '<nav><ul class="pagination">',
		url = window.location.href,
		queryString = $_GET,
		currentPage = (typeof $_GET['page'] == 'undefined') ? 1 : parseInt($_GET['page']),
		cssClass = '',
		totalPages = Math.ceil( totalResults / 10 );

	url = url.replace(window.location.search, '?');

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

	for(let i = 1; i <= totalPages; i++){
		cssClass = (currentPage == i) ? ' class="active"' : '';
		queryString.page = i;
		pag += `<li${cssClass}><a href="${url + queryString.query()}">${i}</a></li>`;
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

function showMovieData( json ){
	let
		$filmTitle = document.querySelector('.film-title'),
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
	$filmImdb.innerHTML = movie.imdb_code;
	$filmGenres.innerHTML = movie.genres.map(function(val){
		return ` <a href="genre.html?genre=${val}">${val}</a>`;
	});
	$filmPlot.innerHTML = movie.description_full;
	$filmLang.innerHTML = movie.language;
	$filmPoster.setAttribute('src', movie.medium_cover_image);
	$filmPoster.setAttribute('alt', movie.title);

	if( movie.cast ){
		$filmCast.innerHTML = movie.cast.map(function(act){
			return ` ${act.name} (${act.character_name})`;
		});
	} else {
		$filmCast.innerHTML = 'N/A';
	}

	// Get movie suggestions
	yts.movieSuggestions(movie.id, showMovieSuggestions);

	// Show torrent list
	let temp = '';
	let download;

	for(let torrent of movie.torrents){
		download = `magnet:?xt=urn:btih:${torrent.hash}&dn=${encodeURI(movie.title + ' ' + torrent.quality)}&tr=udp://open.demonii.com:1337/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969`;
		temp += `<tr><td>${movie.title}</td><td>${torrent.quality}</td><td>${torrent.peers}</td>`;
		temp += `<td>${torrent.seeds}</td><td>${torrent.size}</td><td><a href="${download}" target="_blank">Baixar</a></td></tr>`;
	}

	document.querySelector('#tableTorrent tbody').innerHTML = temp;
	document.getElementById('loader').style.display = "none";
}

function showMovieSuggestions( json ){
	console.log( json );
}