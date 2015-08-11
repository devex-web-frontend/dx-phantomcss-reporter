import React from 'react';

import * as propTypes from '../../util/propTypes';

import './Suite.styl';
import './Suite.theme.styl';

export default React.createClass({
	contextTypes: {
		router: React.PropTypes.func
	},

	propTypes: {
		data: propTypes.data
	},

	render() {
		let testIndex = this.context.router.getCurrentParams().suiteIndex;
		let suite = this.props.data.suits[testIndex];
		if (!suite) {
			throw new Error(`Unable to find test with index ${testIndex}`);
		}
		let tests = this.renderTests(suite);
		let options = {
			itemSelector: '.test'
		};

		return (
			<div className="suite">
				<h2 className="suite--title">{suite.name}</h2>
				<div className="suite--content" options={options}>
					{tests}
				</div>
			</div>
		);
	},

	renderTests(suite) {
		return suite.tests.map((test, i)  => {
			return (
				<div className="test" key={i}>
					<h3 className="test--name">{test.name}</h3>
					<img src={test.screenshots.baseline} alt={test.name} className="test--screenshots"/>
				</div>
			);
		});
	}
});