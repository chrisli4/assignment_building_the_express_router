var express = require('./lib/express');

var app = express();

var port = process.env.PORT || 3000;
var host = 'localhost';

app.get('/', (req, res) => {
	res.statusCode = 200;
	res.end('CL: Hello Express Router!\n');
	res.end('GET request to / route\n');
})

app.get('/foo/:bar', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.write('path = /foo/:bar\n');
	res.end(`:bar = ${ req.params.bar }`);
});

app.get('/foo/:bar/baz/:biz', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.write('path = /foo/:bar/baz/:biz\n');
	res.end(`:bar = ${ req.params.bar }<br>:biz = ${req.params.biz}`);
});

app.post('/', (req, res) => {
	let data = req.body;

	if(req.headers['content-type'] === 'application/json') {
		data = JSON.parse(req.body);
		data = JSON.stringify(data, null, 2);
	};

	res.end(`POST DATA: ${ data }`);


});

app.listen(port, host, () => {
	console.log(`Listening at: http://${ host }:${ port }/`);
});
