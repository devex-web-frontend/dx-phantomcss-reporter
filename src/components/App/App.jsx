import React from 'react';
import cx from 'classnames';
import {RouteHandler, Link} from 'react-router';

import './App.styl';

export default React.createClass({
	propTypes: {
		data: React.PropTypes.objectOf({ //TODO: replace with immutable
			project: React.PropTypes.objectOf({
				name: React.PropTypes.string.isRequired,
				link: React.PropTypes.string.isRequired
			}).isRequired,
			build: React.PropTypes.objectOf({
				number: React.PropTypes.string.isRequired,
				link: React.PropTypes.string.isRequired
			}).isRequired,
			success: React.PropTypes.bool,
			suits: React.PropTypes.arrayOf(
				React.PropTypes.objectOf({
					name: React.PropTypes.string.isRequired,
					success: React.PropTypes.bool.isRequired,
					tests: React.PropTypes.arrayOf(
						React.PropTypes.objectOf({
							name: React.PropTypes.string.isRequired,
							screenshots: React.PropTypes.objectOf({
								baseline: React.PropTypes.string.isRequired,
								diff: React.PropTypes.string.isRequired,
								fail: React.PropTypes.string
							}).isRequired
						})
					).isRequired
				})
			).isRequired
		}).isRequired
	},

	getInitialState() {
		let failed = this.props.data;
		return {
			success: !(failed && Object.keys(failed).length > 0)
		};
	},

	render() {
		let data = this.props.data;

		let appTitle = `${data.project.name} #${data.build.number} CSS Regression Report`;
		let links = this.createMenuLinks(data);
		let buildClassName = data.success ? 'layout-success' : 'layout-fail';

		return (
			<div className={`layout ${buildClassName}`}>
				<header className="layout--header">
					<h1 className="layout--headerTitle">{appTitle}</h1>
					<a className="layout--headerLink" href={data.build.link}>Open TeamCity</a>
				</header>
				<main className="layout--main">
					<aside className="layout--navigation navigation build">
						<div className="navigation--header">
							Build: <a href={data.build.link}>#{data.build.number}</a>
						</div>
						<div className="navigation--list">
							{links}
						</div>
					</aside>
					<section className="layout--content">
						<RouteHandler data={data}/>
					</section>
				</main>
			</div>
		);
	},

	createMenuLinks(data) {
		return data.suits.map((suite, i) => {
			let success = suite.success;
			let suiteClassName = cx('navigation--item', 'build--suite', {
				'build--suite-success': success,
				'build--suite-fail': !success
			});
			let iconClassName = cx('zmdi', 'navigation--itemIcon', 'build--suiteStatus', {
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