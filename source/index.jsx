// https://www.youtube.com/watch?v=_Fzl0Cim6F8&t=922s

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, NavLink, Switch } from 'react-router-dom'
import { Button, Header, Image } from 'semantic-ui-css/semantic.min.css';
import history from './components/history.jsx';

// Include your new Components here
import Detail from './components/Detail/Detail.jsx';
import Gallery from './components/Gallery/Gallery.jsx';
import List from './components/List/List.jsx';

// Include any new stylesheets here
// Note that components' stylesheets should NOT be included here.
// They should be 'require'd in their component class file.
require('./styles/main.scss');

// Define your router and replace <Home /> with it!
render((
	<Router history={history}>
		<div>
			<h3>Popular TV Shows</h3>
			<ul>
				<li className="search-link"><NavLink exact activeClassName='active' to='/'><span>Search</span></NavLink></li>
				<li className="gallery-link"><NavLink activeClassName='active' to='/gallery'><span>Gallery</span></NavLink></li>
			</ul>
			<Switch>
				<Route exact path='/' component={List} />
				<Route exact path='/gallery' component={Gallery} />
				<Route exact path='/detail/:id' component={Detail} />
				<Route render={function(){return <p className='not-found'>Page Not Found</p>}} />
			</Switch>
		</div>
	</Router>
), document.getElementById('app'));
