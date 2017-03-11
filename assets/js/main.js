'use strict';

/// Mount a query string
Object.prototype.query = function(){
	let q = '';

	for(let k of Object.keys(this)){
		q += `&${k}=${this[k]}`;
	}

	return q.substr(1);
}

/// Get query params
window.$_GET = window.location.search.substr(1).split('&').reduce(function(o, i){
	let
		u = decodeURIComponent,
		[k, v] = i.split('=');

	o[u(k)] = v && u(v);

	return o;
}, {});

/// Execute all requisitions
function getJSON( url, callback ){
	let xhr = new XMLHttpRequest();
	xhr.onload = () => callback( JSON.parse(xhr.responseText) );
	xhr.open( 'GET', url );
	xhr.send();
}

/**
 * Functions to OMDb
 */

/// Load requisition
function searchOMDb(){
	let url = 'http://www.omdbapi.com/?';
	let params = {
		"s": $_GET['s'],
		"type": $_GET['type'],
		"r": "json",
		"page": (typeof $_GET['page'] != 'undefined') ? $_GET['page'] : 1
		//"plot": "short",
		//"tomatoes": true
	};
	url += params.query();
	getJSON( url, showSearchResults );
}

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
	console.log( json );
	let
		$filmTitle = document.querySelector('.film-title'),
		$filmYear = document.querySelector('.film-year'),
		$filmImdb = document.querySelector('.film-imdb'),
		$filmGenres = document.querySelector('.film-genres'),
		$filmPoster = document.querySelector('.film-poster'),
		$filmPlot = document.querySelector('.film-plot');

	$filmTitle.innerHTML = json.data.movie.title;
	$filmYear.innerHTML = json.data.movie.year;
	$filmImdb.innerHTML = json.data.movie.imdb_code;
	$filmGenres.innerHTML = json.data.movie.genres.map(function(val){
		return ` <a href="genres.html?genre=${val}">${val}</a>`;
	});
	$filmPlot.innerHTML = json.data.movie.description_full;
	$filmPoster.setAttribute('src', json.data.movie.large_cover_image);
	$filmPoster.setAttribute('alt', json.data.movie.title);

	// Show torrent list
	let temp = '';
	let download;

	for(let torrent of json.data.movie.torrents){
		download = `magnet:?xt=urn:btih:${torrent.hash}&dn=${encodeURI(json.data.movie.title + ' ' + torrent.quality)}&tr=udp://open.demonii.com:1337/announce&tr=udp://tracker.openbittorrent.com:80&tr=udp://tracker.coppersurfer.tk:6969`;
		temp += `<tr><td>${json.data.movie.title}</td><td>${torrent.quality}</td><td>${torrent.peers}</td>`;
		temp += `<td>${torrent.seeds}</td><td>${torrent.size}</td><td><a href="${download}" target="_blank">Baixar</a></td></tr>`;
	}

	document.querySelector('#tableTorrent tbody').innerHTML = temp;
	document.getElementById('loader').style.display = "none";
}
