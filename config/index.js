'use strict';

module.exports = {
	// Настройки сервера для nodeJS
	'server': {
		'host': "localhost",
		'port': 3000,
	},

	// Настройки приложения
	'app': {
		'viewPath': `${__dirname}/../public/view`, // Папка с view'хами
		'staticPath': `${__dirname}/../public`, // папка для статических файлов
	},

};
