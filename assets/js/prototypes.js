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