'use strict';

const fs = require('fs');
const path = require('path');

// Роут для главной
app.get('/', (req, res) => res.sendFile(path.resolve('public/view/index.html')) );

// Выплевываем таски
app.post('/get/tasks', (req, res) => {

	fs.readFile(
		path.resolve('data/tasks.json'),
		'utf8',
		(err, content) => {

			try {
				if (err) throw err;

				res.format({
					'application/json': (req, res) => res.json(JSON.parse(content))
				});
			} catch (e) {
				console.log(e);
				res.format({
					'text/plain': (req, res) => res.send('Invalid json file!')
				});
			}
		}
	);

});

// Помечаем, что таск завершена
app.post(/^\/del\/task\/(\d+)$/, (req, res) => {

	fs.readFile(
		path.resolve('data/tasks.json'),
		'utf8',
		(err, content) => {

			try {
				if (err) throw err;

				let file = JSON.parse(content);
				file.map(task => {
					if (task.id == req.params[0])
						task.completed = true;
				});

				fs.writeFile(
					path.resolve('data/tasks.json'),
					JSON.stringify(file, null, 2),
					'utf8',
					err => console.log('Error on while write file: ', err)
				);

				res.format({
					'text/plain': (req, res) => res.send('OK')
				});
			} catch (e) {
				console.log(e);
				res.format({
					'text/plain': (req, res) => res.send('Invalid json file!')
				});
			}
		}
	);
});

// на остальные запросы выкидываем 404
app.all('*', (req, res) => {
	res.format({
		'text/plain': () => res.status(404).send('Page not found')
	});
});
