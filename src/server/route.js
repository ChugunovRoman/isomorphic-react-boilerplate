'use strict';

const { createElement } = require('react');
const { renderToString } = require('react-dom/server');

const fs = require('fs');
const path = require('path');

const Html = require('./html');

app.use((req, res) => {
	const context = '';

	const html = renderToString(
		createElement(Html, {
			context
		}, null)
	);

	if (context.url) {
		console.log('context: ', context);
		res.writeHead(301, {
			location: context.url
		});
		res.end();
	} else {
		res
			.status(200)
			.send(`<!doctype html>\n${ html }`);
	}
});

// Роут для главной
// app.get('/', (req, res) => res.sendFile(path.resolve('public/view/index.html')) );

// на остальные запросы выкидываем 404
app.all('*', (req, res) => {
	res.format({
		'text/plain': () => res.status(404).send('Page not found')
	});
});
