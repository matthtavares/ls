/// Mount a query string
Object.prototype.query = function(){
	let q = '';

	for(let k of Object.keys(this)){
		q += `&${k}=${this[k]}`;
	}

	return q.substr(1);
}
