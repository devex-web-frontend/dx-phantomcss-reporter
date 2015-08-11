import React from 'react';
import * as propTypes from '../../util/propTypes';
import './Header.styl';

export default React.createClass({
	propTypes: {
		build: propTypes.build.isRequired,
		project: propTypes.project.isRequired
	},

	render() {
		let {build, project} = this.props;
		return (
			<header className="header">
				<h1 className="header--title">
					{`${project.name} #${build.number} CSS Regression Report`}
				</h1>
				<a className="header--link" href={build.link}>Open TeamCity</a>
			</header>
		);
	}
});