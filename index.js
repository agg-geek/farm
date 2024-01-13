const http = require('http');
const fs = require('fs');
const path = require('path');
const { type } = require('os');

const dataJSON = fs.readFileSync('./data.json', 'utf-8'); // notice sync operation
// console.log(typeof dataJSON); // string

const data = JSON.parse(dataJSON);

const server = http.createServer((req, res) => {
	const pathName = req.url;

	if (pathName === '/' || pathName === '/overview') {
		res.end('This is OVERVIEW');
	} else if (pathName === '/product') {
		res.end('This is PRODUCT');
	} else if (pathName === '/api') {
		res.writeHead(200, { 'Content-type': 'application/json' });
		res.end(dataJSON); // res.end requires a string, so send the JSON string
	} else {
		res.writeHead(404, { 'Content-type': 'text/html' });
		res.end('<h1>Page not found</h1>');
	}
});

server.listen(8080, '127.0.0.1', () => {
	console.log('Server is listening at port 8080');
});
