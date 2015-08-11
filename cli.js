#!/usr/bin/env node

var app = require('commander');
var path = require('path');
var fs = require('fs');
var glob = require('glob');
var mkdirp = require('mkdirp');
var webpack = require('webpack');
var alphanumeric = require('alphanumeric-sort');

var cwd = process.cwd();
var root = path.dirname(__filename);

app
	.version(require(path.resolve(root, 'package.json')).version, '')
	.usage('<command> [options]');

//noinspection JSCheckFunctionSignatures
app
	.command('report <config>')
	.description('Creates report basing on passed phantomcss config')
	.option('-d, --destination [destination]', 'Destination', 'report')
	.action(report);

app
	.parse(process.argv);

if (!app.args.length) {
	app.help();
}

/*
 * Report command
 * @param {String} configPath
 * @param {{destination: String}} options
 */
function report(configPath, options) {
	var config = require(path.resolve(configPath));
	var destination = path.resolve(options.destination);
	var pathShift = path.relative(destination, cwd);

	var results = config.comparisonResultRoot;
	var failed = config.failedComparisonsRoot;
	var pjson = require(path.resolve('package.json'));

	//TODO: take links from TeamCity ENV variables
	var report = {
		project: {
			name: pjson.name,
			link: '#'
		},
		build: {
			number: pjson.version,
			link: '#'
		},
		success: !fs.existsSync(failed),
		suits: glob.sync(results + '/*').sort(alphanumeric.compare).map(processSuite.bind(this, failed, pathShift))
	};
	report.success = !report.suits.some(function(suite) {
		return !suite.success;
	});

	var reportPath = path.resolve(destination, 'report.json');
	console.log('Generating report ', reportPath);
	mkdirp.sync(destination);
	fs.writeFileSync(reportPath, JSON.stringify(report, null, 4));

	console.log('Bundling resources');
	fs.writeFileSync(path.resolve(destination, 'index.html'), fs.readFileSync(path.resolve(root, 'index.html')));

	process.env.NODE_ENV = 'production';
	var webpackConfig = loadWebpackConfig(reportPath, destination);
	webpack(webpackConfig, function(error, stats) {
		if (error) {
			throw error;
		}
		console.log('DONE');
	});
}

/**
 * Parses suite directory
 * @param {String} failedPath
 * @param {String} pathShift
 * @param {String} suitePath
 * @returns {Object} suite
 */
function processSuite(failedPath, pathShift, suitePath) {
	var suiteName = path.basename(suitePath);
	var suiteFailed = false;
	var tests = glob.sync(suitePath + '/*.diff.png').sort(alphanumeric.compare).reduce(function(acc, diff) {
		var baseName = path.basename(diff);
		var testName = baseName.replace(/\.diff\.png$/, '');

		var baseline = diff.replace(/\.diff\.png$/, '.png');
		var fail = path.relative(cwd,
			path.resolve(failedPath, suiteName, baseName.replace(/\.diff\.png$/, '.fail.png'))
		);
		var test = {
			name: testName,
			screenshots: {
				baseline: path.join(pathShift, baseline),
				diff: path.join(pathShift, diff)
			}
		};
		if (fs.existsSync(fail)) {
			test.screenshots.fail = path.join(pathShift, fail);
			suiteFailed = true;
		}

		acc.push(test);
		return acc;
	}, []);
	return {
		name: suiteName,
		success: !suiteFailed,
		tests: tests
	};
}

/**
 * Loads root webpack.config.js and updates values for report
 * @param {String} reportPath
 * @param {String} destination
 * @returns {*}
 */
function loadWebpackConfig(reportPath, destination) {
	var webpackConfig = require(path.resolve(root, 'webpack.config.js'));
	webpackConfig.resolve = webpackConfig.resolve || {};
	webpackConfig.resolve.alias = webpackConfig.resolve.alias || {};
	webpackConfig.resolve.alias['dx-phantomcss-report'] = reportPath;
	webpackConfig.output.path = path.resolve(destination);
	return webpackConfig;
}