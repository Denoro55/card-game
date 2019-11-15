const path = require('path');

module.exports = {
	entry: './src/scripts/index.js',
	output: {
		path: path.resolve(__dirname, './dist'), // соединяет пути правильно
		filename: 'main.js',
		publicPath: '/'  // (при браузерсинке чтобы видело путь и обновляло автоматом)
	},
	devServer: {
		overlay: true,  // (для ошибок на экране вместо консоли)
		contentBase: path.join(__dirname, 'dist'),
	},
}