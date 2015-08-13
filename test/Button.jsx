import React from 'react';
import './Button.styl';
import './Button.theme.styl';

export default React.createClass({
	propTypes: {
		children: React.PropTypes.node
	},
	render() {
		return (
			<button>{this.props.children}</button>
		);
	}
});