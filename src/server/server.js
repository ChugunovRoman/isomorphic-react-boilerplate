'use strict'

const config = require('./../../config');
const path = require('path');

// указываем express'у где у нас лежать view'хи
// app.use(express.static(path.join(config.app.viewPath)));

// Стартуем серв
app.listen(
	config.server.port,
	config.server.host,
	() => console.log(`Server is running on ${config.server.host}:${config.server.port}`)
);
