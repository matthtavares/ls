export function addEvent(elem, event, callback) {
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

export function showSearchPagination( limit, totalResults ){
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