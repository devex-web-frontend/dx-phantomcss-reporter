import React from 'react';

import './Suite.styl';

export default React.createClass({
	contextTypes: {
		router: React.PropTypes.func
	},

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

	render() {
		let testIndex = this.context.router.getCurrentParams().suiteIndex;
		let suite = this.props.data.suits[testIndex];
		if (!suite) {
			throw new Error(`Unable to find test with index ${testIndex}`);
		}
		return (
			<div className="suite">
				<h2 className="suite--title">{suite.name}</h2>
				<div className="suite--content">
					{suite.tests.map((test, i) => {
						return (
							<div className="test" key={i}>
								<h3 className="test--name">{test.name}</h3>
								<img src={test.screenshots.baseline} alt={test.name} className="test--screenshots"/>
							</div>
						);
					})}
				</div>
			</div>
		);
	},

	renderTest(test, i) {

	}
});