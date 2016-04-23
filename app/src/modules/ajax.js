function Ajax(path) {
	var oReq = new XMLHttpRequest();
	oReq.onload = (function (e) {
		console.log(e);
		callback && callback.call(this);
	}).bind(this);

	oReq.open('GET', path, true);
	oReq.responseType = 'json';
	oReq.send();
}

export default Ajax;