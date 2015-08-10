var path = require('path');
var nib = require('nib');
var autoprefixer = require('autoprefixer-core');
//var autoprefixer = require

module.exports = {
	context: path.resolve('src'),
	entry: {
		js: ['webpack/hot/dev-server', './index.js'],
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
				loaders: ['react-hot', 'babel-loader?stage=0']
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
	stylus: {
		use: [nib()]
	},
	postcss: function postcss() {
		return [autoprefixer];
	}
};