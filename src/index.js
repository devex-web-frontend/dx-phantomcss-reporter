import './index.styl';

import React from 'react';
import Router from 'react-router';
import {Route, DefaultRoute} from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import App from './components/App/App.jsx';
import Suite from './components/Suite/Suite.jsx';

import data from 'dx-phantomcss-report'; //should be resolved in webpack config!

let routes = (
	<Route handler={App} path="/">
		<Route name="suite" path="/:suiteIndex" handler={Suite}/>
	</Route>
);

Router.run(routes, Handler => {
	React.render(<Handler data={data}/>, document.body);
});