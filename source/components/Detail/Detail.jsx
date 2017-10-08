import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import styles from './Detail.scss';

require('./Detail.scss');

class Detail extends Component {
    render() {
        return( // all has to be in one main div
            <div className="Detail">
                <h1>My Movie Boy</h1>
            </div>
        )
    }
}

export default Detail;
