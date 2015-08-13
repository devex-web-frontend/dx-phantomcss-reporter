var path = require('path');
var nib = require('nib');
var autoprefixer = require('autoprefixer-core');
var production = process.env.NODE_ENV === 'production';
var root = path.dirname(__filename);

module.exports = {
	context: path.resolve(root),
	entry: {
		js: (production ? [] : ['webpack/hot/dev-server']).concat('./src/index.js'),
		css: ['./src/index.styl']
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve('dist')
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: [/dx-phantomcss-reporter\/node_modules|node_modules(?!\/dx-phantomcss-reporter)/],
				loaders: (production ? [] : ['react-hot']).concat('babel-loader?stage=0')
			},
			{
				test: /\.jsx$/,
				loaders: (production ? [] : ['react-hot']).concat('babel-loader?stage=0')
			},
			{
				test: /\.styl$/,
				loaders: ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader']
			},
			{
				test: /\.ttf$|\.woff$|\.woff2$|\.svg$|\.eot$/,
				loaders: ['file-loader']
			},
			{
				test: /\.json$/,
				loaders: ['json-loader']
			}
		]
	},
	resolve: {
		alias: {
			'dx-phantomcss-report': path.resolve(root, './temp.json')
		}
	},
	stylus: {
		use: [nib()]
	},
	postcss: function postcss() {
		return [autoprefixer];
	}
};