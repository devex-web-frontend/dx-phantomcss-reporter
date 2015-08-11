import React from 'react';
import cx from 'classnames';
import * as propTypes from '../../util/propTypes';

import './Header.styl';
import './Header.theme.styl';

export default React.createClass({
	propTypes: {
		build: propTypes.build.isRequired,
		project: propTypes.project.isRequired,
		success: React.PropTypes.bool
	},

	render() {
		let {build, project, success} = this.props;
		let headerClassName = cx('header', {
			'header-success': success,
			'header-fail': !success
		});
		let statusClassName = cx('zmdi', 'header--status', {
			'zmdi-check-all': success,
			'zmdi-alert-circle-o': !success
		});

		return (
			<header className={headerClassName}>
				<h1 className="header--title">
					{`${project.name} #${build.number} CSS Regression Report`}
				</h1>
				<i className={statusClassName}/>
			</header>
		);
	}
});