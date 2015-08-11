var path = require('path');
var nib = require('nib');
var autoprefixer = require('autoprefixer-core');
//var autoprefixer = require
var production = process.env.NODE_ENV === 'production';

module.exports = {
	context: path.resolve('src'),
	entry: {
		js: (production ? [] : ['webpack/hot/dev-server']).concat('./index.js'),
		css: ['./index.styl']
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve('dist')
	},
	module: {
		loaders: [
			{
				test: /\.js$|\.jsx$/,
				exclude: /node_modules/,
				loaders: (production ? [] : ['react-hot']).concat('babel-loader?stage=0')
			},
			{
				test: /\.sass$|\.scss$/,
				loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
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
			'dx-phantomcss-report': '../temp.json'
		}
	},
	stylus: {
		use: [nib()]
	},
	postcss: function postcss() {
		return [autoprefixer];
	}
};