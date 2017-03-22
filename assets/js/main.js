'use strict';

/// Get query params
window.$_GET = window.location.search.substr(1).split('&').reduce(function(o, i){
	let
		u = decodeURIComponent,
		[k, v] = i.split('=');

	o[u(k)] = v && u(v);

	return o;
}, {});

/// Add events
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

/// UI options
var
	hamburgerBtn = document.querySelector('.hamburger'),
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
addEvent(hamburgerBtn, 'click', hamburger_cross);
addEvent(document.querySelector('[data-toggle="offcanvas"]'), 'click', function(){
	document.querySelector('#wrapper').classList.toggle('toggled')
});
addEvent(document.querySelector('.btn-goback'), 'click', function(){
	window.history.back();
});

function showSearchResults( json ){
	let
		temp = '',
		i = 1;

	if( json.data.movies && json.data.movies.length > 0 ){

		for(let value of json.data.movies){
			// Replace image if not avaible
			if( value.large_cover_image == 'N/A' )
				value.large_cover_image = 'https://placeholdit.imgix.net/~text?txtsize=18&txt=Poster+n%C3%A3o+dispon%C3%ADvel&w=250&h=360&txttrack=0';

	        if( i == 1 ){
	          temp += '<div class="row">';
	        }
	        temp += `<div class="col-md-3"><div class="thumbnail"><a href="film.html?id=${value.id}"><img src="${value.large_cover_image}" alt="${value.title}"></a><div class="caption"><h2>${value.title}</h2><p><b>Year:</b> ${value.year}<br><b>IMDb:</b> <a href="http://www.imdb.com/title/${value.imdb_code}/" target="_balnk">View page</a></p></div></div></div>`;
	        if( i == 4 ){
	          temp += '</div>';
	          i = 0;
	        }
	        i++;
		}

		// Show pagination
		showSearchPagination(json.data.limit, json.data.movie_count);

	} else {
		temp = '<h3 class="text-danger text-center">Não há resultados!</h3>';
	}

	document.getElementById('searchResults').innerHTML = temp;

	// Hide loading
	document.getElementById('loader').style.display = "none";
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
	$filmImdb.innerHTML = `<a href="http://www.imdb.com/title/${movie.imdb_code}/" target="_balnk">View page</a>`;
	$filmGenres.innerHTML = movie.genres.map(function(val){
		return ` <a href="genre.html?genre=${val}">${val}</a>`;
	});
	$filmPlot.innerHTML = movie.description_full;
	$filmLang.innerHTML = movie.language;
	$filmPoster.setAttribute('src', movie.medium_cover_image);
	$filmPoster.setAttribute('alt', movie.title);

	if( movie.cast ){
		$filmCast.innerHTML = movie.cast.map(function(act){
			return ` <a href="http://www.imdb.com/name/nm${act.imdb_code}/" target="_blank">${act.name} (${act.character_name})</a>`;
		});
	} else {
		$filmCast.innerHTML = 'N/A';
	}

	// YouTube trailer
	if( movie.yt_trailer_code ){
		document.querySelector('.yt-btn').innerHTML = `<button type="button" class="btn btn-youtube btn-fill" data-yt-code="${movie.yt_trailer_code}"><i class="fa fa-youtube-play"></i> Watch Trailer</button>`;
		yttrailer.create( movie.yt_trailer_code );
addEvent(		document.querySelector('.btn-youtube'), 'click', yttrailer.open );
	}

	// Movie title on title bar
	document.querySelector('title').prepend(`${movie.title} - `);

	// Show torrent list
	let temp = '';
	let download;

	for(let torrent of movie.torrents){
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
//Contact us
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
        telefone.style.backgroundColor = "#FB4A4A";
      if(!validateEmail(email.value))
        email.style.backgroundColor = "#FB4A4A";
      return false;
  }
}
email.oninput = () =>
{
    email.style.backgroundColor = "white";
}
telefone.oninput = () =>
{
    telefone.style.backgroundColor = "white";
}

contactButton.onclick = () =>
{
  if(validateAll()&&(firstName.value!=""&&lastName.value!=""&&email.value!=""&&telefone.value!=""))
  {
    firstName.value = "";
    lastName.value = "";
    email.value = "";
    telefone.value = "";
    comment.value = "";
    swal({
    title: 'Good job!',
    text: 'You message has been send',
    type: 'success',
    confirmButtonText: 'Ok'
  })

  }
  else
  {
    swal({
    title: 'Error!',
    text: 'Do you want to continue',
    type: 'error',
    confirmButtonText: 'Ok'
  })
  }
}
