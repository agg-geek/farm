const http = require('http');
const path = require('path');

const server = http.createServer((req, res) => {
	const pathName = req.url;

	if (pathName === '/' || pathName === '/overview') {
		res.end('This is OVERVIEW');
	} else if (pathName === '/product') {
		res.end('This is PRODUCT');
	} else {
		res.writeHead(404, { 'Content-type': 'text/html' });
		res.end('<h1>Page not found</h1>');
	}
});

server.listen(8080, '127.0.0.1', () => {
	console.log('Server is listening at port 8080');
});
