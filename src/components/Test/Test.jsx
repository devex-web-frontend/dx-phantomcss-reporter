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

		return (
			<div className={testClassName} onClick={this.onClick}>
				<h3 className="test--title">
					<i className={statusClassName}></i>
					<span className="test--name">{test.name}</span>
				</h3>
				<div className="test--content">
					<a href={test.screenshots.baseline} target="_blank" className="test--screenshot">
						<img src={test.screenshots.baseline}
							 alt={test.name}
							 className="test--screenshotImage"
							 onClick={this.onScreenshotClick}/>
					</a>
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
		console.log(event);
		event.stopPropagation();
	}
});