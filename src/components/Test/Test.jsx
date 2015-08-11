import React from 'react';
import cx from 'classnames';
import * as propTypes from '../../util/propTypes';

import './Test.styl';
import './Test.theme.styl';

export default React.createClass({
	propTypes: {
		test: propTypes.test.isRequired
	},

	getInitialState() {
		return {
			active: false
		};
	},

	render() {
		let {test} = this.props;
		let success = !test.screenshots.fail;
		let testClassName = cx('test', {
			'test-success': success,
			'test-fail': !success,
			'test-active': this.state.active
		});
		let statusClassName = cx('zmdi', 'test--status', {
			'zmdi-check': success,
			'zmdi-alert-circle-o': !success
		});

		let screenshots = this.renderScreenshots(test);

		return (
			<div className={testClassName} onClick={this.onClick}>
				<h3 className="test--title">
					<i className={statusClassName}></i>
					<span className="test--name">{test.name}</span>
				</h3>
				<div className="test--content">
					{screenshots}
				</div>
			</div>
		);
	},

	onClick(event) {
		this.setState({
			active: !this.state.active
		});
	},

	onScreenshotClick(event) {
		event.stopPropagation();
	},

	renderScreenshots(test) {
		let screenshots = ['baseline'];
		let success = !test.screenshots.fail;
		if (!success) {
			screenshots = screenshots.concat(['diff', 'fail']);
		}
		return screenshots.map((screenshot, i) => {
			let linkContent = [
				<img src={test.screenshots[screenshot]}
					 alt={`${test.name} ${screenshot}`}
					 className="test--screenshotImage"
					 key="test--screenshotImage"
					 onClick={this.onScreenshotClick}/>
			];
			if (!success) {
				linkContent.unshift(
					<span className="test--screenshotDescription" key="test--screenshotDescription">{screenshot}</span>
				);
			}
			return (
				<a href={test.screenshots[screenshot]} target="_blank" className="test--screenshot" key={i}>
					{linkContent}
				</a>
			);
		});
	}
});