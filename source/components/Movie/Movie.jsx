import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import styles from './Movie.scss';

require('./Movie.scss');

class Movie extends Component {
	constructor() {
		super();
		this.state = {
			value: "",
			movie: {}
		};
	}
    render() {
        return( // all has to be in one main div
            <div className="Movie">
                <h1>My movies buddy</h1>
            </div>
        )
    }
}

export default Movie;
