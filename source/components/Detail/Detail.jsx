import React, { Component } from 'react';
import { Button, Item, Image, Header, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

import styles from './Detail.scss';

import history from '../history.jsx'

require('./Detail.scss');

/*
						<div key={movie.id} className='detail-card'>
							<h4 className='detail-title'>{movie.name}</h4>
							<h4>{'Rating: ' + movie.vote_average}</h4>
							<p className='detail-overview'>{movie.overview}</p>
							<img className="detail-picture" src={"https://image.tmdb.org/t/p/w500"+ movie.poster_path} />
						</div>


							<Item>
								<Item.Image src={"https://image.tmdb.org/t/p/w500"+ movie.poster_path} size='small'/>
								<Item.Content>
									<Item.Header>{movie.name}</Item.Header>
									<Item.Meta>Description</Item.Meta>
									<Item.Description>{movie.overview}</Item.Description>
								</Item.Content>
							</Item>
*/

function DisplayMovie(props) {
	return(
		<ul className='detail-wrap'>
			{props.movies.map( function(movie, index) {
				if(props.currentMovieId == movie.id) {
					return (
						<div key={movie.id} className='detail-card'>
							<Grid>
								<Grid.Column width={4}>
									<h3 className='detail-title'>{movie.name}</h3>
									<img className='detail-picture' src={"https://image.tmdb.org/t/p/w500"+ movie.poster_path}/>
								</Grid.Column>
								<Grid.Column width={12}>
									<p className='detail-description'>{movie.overview}</p>
									<p className='detail-text'>{"First Air Date: "+movie.first_air_date}</p>
									<p className='detail-text'>{"Rating: "+movie.vote_average}</p>
								</Grid.Column>
							</Grid>
						</div>
					)
				}
				else {
					return null;
				}
			})}
		</ul>
	)
}

DisplayMovie.propTypes = {
	movies: PropTypes.array.isRequired,
}

class Detail extends Component {
	constructor() {
		super();
		this.state = {
			movies: [],
			currentMovieId: '',
		};
		this.previousClickHandler = this.previousClickHandler.bind(this);
		this.nextClickHandler = this.nextClickHandler.bind(this);
	}
	previousClickHandler(event) {
		let counter=0;
		while(this.state.movies[counter].id!=this.state.currentMovieId) {
			counter++;
		}
		if(counter == 0) {
			this.props.history.push("/detail/"+this.state.movies[119].id); // JUST CHANGE THE DISPLAY MOVIE INSTEAD OF ROUTE, WELL OR BOTH REALLY
			this.setState({currentMovieId: this.state.movies[119].id});
		}
		else {
			this.props.history.push("/detail/"+this.state.movies[counter-1].id);
			this.setState({currentMovieId: this.state.movies[counter-1].id});
		}
	}
	nextClickHandler(event) {
		let counter=0;
		while(this.state.movies[counter].id!=this.state.currentMovieId) {
			counter++;
		}
		if(counter == 119) {
			this.props.history.push("/detail/"+this.state.movies[0].id);
			this.setState({currentMovieId: this.state.movies[0].id});
		}
		else {
			this.props.history.push("/detail/"+this.state.movies[counter+1].id);
			this.setState({currentMovieId: this.state.movies[counter+1].id});
		}
	}
	componentDidMount() {
		axios.get("https://api.themoviedb.org/3/tv/popular?api_key=8ff57880be2280976774263f78f86c5e&language=en-US&page=1")
			.then((response) => {
				this.setState({movies: response.data.results})
				return axios.get("https://api.themoviedb.org/3/tv/popular?api_key=8ff57880be2280976774263f78f86c5e&language=en-US&page=2");
			})
			.then((response) => {
				this.setState({movies: this.state.movies.concat(response.data.results)})
				return axios.get("https://api.themoviedb.org/3/tv/popular?api_key=8ff57880be2280976774263f78f86c5e&language=en-US&page=3");
			})
			.then((response) => {
				this.setState({movies: this.state.movies.concat(response.data.results)})
				return axios.get("https://api.themoviedb.org/3/tv/popular?api_key=8ff57880be2280976774263f78f86c5e&language=en-US&page=4");
			})
			.then((response) => {
				this.setState({movies: this.state.movies.concat(response.data.results)})
				return axios.get("https://api.themoviedb.org/3/tv/popular?api_key=8ff57880be2280976774263f78f86c5e&language=en-US&page=5");
			})
			.then((response) => {
				this.setState({movies: this.state.movies.concat(response.data.results)})
				return axios.get("https://api.themoviedb.org/3/tv/popular?api_key=8ff57880be2280976774263f78f86c5e&language=en-US&page=6");
			})
			.then((response) => {
				this.setState({movies: this.state.movies.concat(response.data.results)})
				this.setState({currentMovieId: this.props.match.params.id})
			})
	}
    render() {
        return( // all has to be in one main div
			<div className="Detail-wrapper">
	            <div className="Detail">
					<div className='button-container'>
					<div className='previous-container'>
						<Button className='previous' onClick={()=>this.previousClickHandler(event)}>Previous</Button>
					</div>
					<div className='next-container'>
						<Button className='next' onClick={()=>this.nextClickHandler(event)}>Next</Button>
					</div>
					</div>
					{!this.state.movies
						? <p>LOADING</p>
						: <DisplayMovie movies={this.state.movies} currentMovieId={this.state.currentMovieId}/>
					}
	            </div>
			</div>
        )
    }
}

Detail.propTypes =  {
	movies: PropTypes.arrayOf(PropTypes.object),
	currentMovieId: PropTypes.string,
}

export default Detail;
