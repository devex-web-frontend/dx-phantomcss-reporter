import React from 'react';

//TODO: replace with immutables

export const build = React.PropTypes.objectOf({
	number: React.PropTypes.string.isRequired,
	link: React.PropTypes.string.isRequired
});

export const project = React.PropTypes.objectOf({
	name: React.PropTypes.string.isRequired,
	link: React.PropTypes.string.isRequired
});

export const test = React.PropTypes.objectOf({
	name: React.PropTypes.string.isRequired,
	screenshots: React.PropTypes.objectOf({
		baseline: React.PropTypes.string.isRequired,
		diff: React.PropTypes.string.isRequired,
		fail: React.PropTypes.string
	}).isRequired
});

export const suite = React.PropTypes.objectOf({
	name: React.PropTypes.string.isRequired,
	success: React.PropTypes.bool.isRequired,
	tests: React.PropTypes.arrayOf(test).isRequired
});

export const data = React.PropTypes.objectOf({
	project: project.isRequired,
	build: build.isRequired,
	success: React.PropTypes.bool,
	suits: React.PropTypes.arrayOf(suite).isRequired
});