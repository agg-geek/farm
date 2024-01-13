const http = require('http');
const fs = require('fs');
const url = require('url');

const fillTemplate = require('./modules/fillTemplate');

const dataJSON = fs.readFileSync(`${__dirname}/data.json`, 'utf-8');
const data = JSON.parse(dataJSON);

const templateOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const templateProductCard = fs.readFileSync(`${__dirname}/templates/product-card.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');

const server = http.createServer((req, res) => {
	const { query, pathname } = url.parse(req.url, true);

	if (pathname === '/' || pathname === '/overview') {
		res.writeHead(200, { 'Content-type': 'text/html' });
		const productCardsMarkup = data.map(product => fillTemplate(templateProductCard, product)).join('');
		const markup = templateOverview.replace(/{%PRODUCT_CARDS%}/g, productCardsMarkup);
		res.end(markup);
	} else if (pathname === '/product') {
		const { id: productId } = query;
		res.writeHead(200, { 'Content-type': 'text/html' });
		const markup = fillTemplate(templateProduct, data[productId]);
		res.end(markup);
	} else if (pathname === '/api') {
		res.writeHead(200, { 'Content-type': 'application/json' });
		res.end(dataJSON);
	} else {
		res.writeHead(404, { 'Content-type': 'text/html' });
		res.end('<h1>Page not found</h1>');
	}
});

server.listen(8080, '127.0.0.1', () => {
	console.log('Server is listening at port 8080');
});
