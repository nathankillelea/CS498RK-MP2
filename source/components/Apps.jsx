import React, { Component } from 'react';
import { Button, Header, Image } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import styles from './Apps.scss';
require('./Apps.scss');

let List = require('./List/List.jsx');
let Gallery = require('./Gallery/Gallery.jsx');

class Apps extends Component {
    render() {
        return( // all has to be in one main div
			<Router>
			    <div className="Apps">
					<Switch>
						<Route exact path='/' component={List} />
						<Route path='/gallery' component={Gallery} />
						<Route render={function(){return <p>Not Found</p>}} />
					</Switch>
			    </div>
			</Router>
        )
    }
}

export default Apps;
