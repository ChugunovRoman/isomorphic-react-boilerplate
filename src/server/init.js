'use strict';

const config = require('./../../config');
const path = require('path');

// Указываем где валяются статические файлы (js, css, images)
app.use('/', express.static(path.join(config.app.staticPath)));

// Маршрутизация
require('./route');

// Консольные команды
require('./cmd');

// Запускаем сервa
require('./server');

