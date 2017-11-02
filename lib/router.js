const url = require('url');
const parser = require('./parser');

const Router = {};

Router.methods = [
	'get',
	'post'
];

Router.routes = {};

Router.methods.forEach((method) => {

	Router.routes[method] = Router.routes[method] || {};

	Router[method] = (path, callback) => {
		const pathRegex = parser.parse(path);
		Router.routes[method][pathRegex.pattern] = { callback: callback, 
													 names: pathRegex.names };	
	}
});


let _parsePostData = (req, done) => {
	let body = '';

	req.on('data', (data) => {
		body += data;
	});

	req.on('end', () => {
		req.body = body;
		done();
	});
};


Router.handle = (req, res) => {

	console.log('incoming req');
	const method = req.method.toLowerCase();
	const path = url.parse(req.url).pathname;
	console.log(path);

	//if incoming path matches regex of route , run routes[method][route]

	const pathMatch = parser.match(Router.routes[method], path);

	const pattern = pathMatch.pattern;
	const names = pathMatch.names;
	const values = pathMatch.values;

	console.log('pattern: ' + pattern);
	console.log('names: ' + names);
	console.log('values: ' + values);

	if(pattern) {
		req.params = {};

		for(let i = 0; i < names.length; i++) {

			req.params[names[i]] = values[i];
		};

		let p = new Promise( resolve => {
			if(method !== 'get') {
				_parsePostData(req, resolve);
			} else {
				resolve();
			}
		});

		p.then(() => { 
			Router.routes[method][pattern].callback(req, res); 
		});
	} else {

		res.statusCode = 404;
		res.end('CL: 404 Not Found');

	};
}


module.exports = Router;