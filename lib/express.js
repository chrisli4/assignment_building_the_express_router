const http = require('http');
const router = require('./router');

App = {};

App.listen = (port, hostname, callback) => {

	const server = http.createServer(router.handle);

	server.listen(port, hostname, callback);
};

App.get = (path, callback) => {

	router.get(path, callback);

};

App.post = (path, callback) => {

	router.post(path, callback);

};

App.put = (path, callback) => {

	router.put(path, callback);

};

App.patch = (path, callback) => {

	router.patch(path, callback);

};

App.delete = (path, callback) => {

	router.delete(path, callback);

};

const express = () => {
	return App;
};


module.exports = express;