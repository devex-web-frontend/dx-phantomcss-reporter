import React from 'react';

import * as propTypes from '../../util/propTypes';

import Test from '../Test/Test.jsx';

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
		let tests = suite.tests.map((test, i) => <Test test={test} key={i}/>);
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
	}
});