import React from 'react';
import cx from 'classnames';
import {RouteHandler, Link} from 'react-router';

import Navigation from '../Navigation/Navigation.jsx';
import Header from '../Header/Header.jsx';

import * as propTypes from '../../util/propTypes';

import './App.styl';

export default React.createClass({
	propTypes: {
		data: propTypes.data.isRequired
	},

	render() {
		let {build, project, suits, success} = this.props.data;

		return (
			<div className={`app ${this.props.data.success ? 'app-success' : 'app-fail'}`}>
				<div className="app--header">
					<Header build={build} project={project} success={success}/>
				</div>

				<aside className="app--aside">
					<Navigation build={build} suits={suits}/>
				</aside>

				<main className="app--content">
					<RouteHandler data={this.props.data}/>
				</main>
			</div>
		);
	}
});