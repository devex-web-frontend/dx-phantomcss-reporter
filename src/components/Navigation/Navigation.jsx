import React from 'react';
import cx from 'classnames';
import {Link} from 'react-router';
import * as propTypes from '../../util/propTypes';

import './Navigation.styl';
import './Navigation.theme.styl';

export default React.createClass({
	propTypes: {
		build: propTypes.build.isRequired,
		suits: React.PropTypes.arrayOf(propTypes.suite).isRequired
	},

	render() {
		let {build, suits} = this.props;
		let links = this.createMenuLinks(suits);

		return (
			<div className="navigation build">
				<div className="navigation--header">
					Build: <a href={build.link}>#{build.number}</a>
				</div>
				<div className="navigation--list">
					{links}
				</div>
			</div>
		);
	},

	createMenuLinks(suits) {
		return suits.map((suite, i) => {
			let success = suite.success;
			let suiteClassName = cx('navigation--item', {
				'navigation--item-success': success,
				'navigation--item-fail': !success
			});
			let iconClassName = cx('zmdi', 'navigation--itemIcon', {
				'zmdi-check-all': success,
				'zmdi-alert-circle-o': !success
			});
			return (
				<Link to="suite" params={{suiteIndex: i}} className={suiteClassName} key={i}>
					<div className="navigation--itemTitle">
						{suite.name}
					</div>
					<i className={iconClassName}/>
				</Link>
			);
		});
	}
});