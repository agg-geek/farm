const http = require('http');
const fs = require('fs');
const url = require('url');

const dataJSON = fs.readFileSync(`${__dirname}/data.json`, 'utf-8');
const data = JSON.parse(dataJSON);

const templateOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const templateProductCard = fs.readFileSync(`${__dirname}/templates/product-card.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');

const fillTemplate = function (template, product) {
	let output = template;
	output = output.replace(/{%ID%}/g, product.id);
	output = output.replace(/{%PRODUCTNAME%}/g, product.productName);
	output = output.replace(/{%IMAGE%}/g, product.image);
	output = output.replace(/{%FROM%}/g, product.from);
	output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
	output = output.replace(/{%QUANTITY%}/g, product.quantity);
	output = output.replace(/{%PRICE%}/g, product.price);
	output = output.replace(/{%NOT_ORGANIC%}/g, !product.organic ? 'not-organic' : '');
	output = output.replace(/{%DESCRIPTION%}/g, product.description);

	return output;
};

const server = http.createServer((req, res) => {
	// console.log(req.url);
	// console.log(url.parse(req.url, true)); // true to parse the query string

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
