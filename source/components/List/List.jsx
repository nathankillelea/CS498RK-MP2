import React, { Component } from 'react';
import { Button, Input, Segment, Dropdown, Form, Radio } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

//import styles from './List.scss';

require('./List.scss');

const sortOptions = [
	{ value: 'name', text: 'Name' },
	{ value: 'rating', text: 'Rating'},
]

function MovieGridList(props) {
	return(
		<ul className='popular-list-list'>
			{props.movies.map( function(movie, index) {
				return (
					<div key={movie.id} className='card'>
						<h4 className='title'>{movie.name}</h4>
						<li className='popular-item-list'>
							<img className='picture-list' src={"https://image.tmdb.org/t/p/w500"+ movie.poster_path}/>
						</li>
					</div>
				)
			})}
		</ul>
	)
}

MovieGridList.propTypes = {
	movies: PropTypes.array.isRequired,
}

class List extends Component {
	constructor() {
		super();
		this.state = {
			movies: [],
		};
	}
	componentDidMount() {
		axios.get("https://api.themoviedb.org/3/tv/popular?api_key=8ff57880be2280976774263f78f86c5e&language=en-US&page=1")
		.then((response) => {
			console.log(response.data.results)
			this.setState({
				movies: response.data.results
			})
			axios.get("https://api.themoviedb.org/3/tv/popular?api_key=8ff57880be2280976774263f78f86c5e&language=en-US&page=2")
			.then((response) => {
				console.log(response.data.results)
				this.setState({movies: this.state.movies.concat(response.data.results)})
				axios.get("https://api.themoviedb.org/3/tv/popular?api_key=8ff57880be2280976774263f78f86c5e&language=en-US&page=3")
				.then((response) => {
					console.log(response.data.results)
					this.setState({movies: this.state.movies.concat(response.data.results)})
					axios.get("https://api.themoviedb.org/3/tv/popular?api_key=8ff57880be2280976774263f78f86c5e&language=en-US&page=4")
					.then((response) => {
						console.log(response.data.results)
						this.setState({movies: this.state.movies.concat(response.data.results)})
						axios.get("https://api.themoviedb.org/3/tv/popular?api_key=8ff57880be2280976774263f78f86c5e&language=en-US&page=5")
						.then((response) => {
							console.log(response.data.results)
							this.setState({movies: this.state.movies.concat(response.data.results)})
						})
					})
				})
			})
		})
	}
    render() {
        return(
            <div className="List">
				<div className="container">
                	<Input placeholder='Search . . .' fluid/>
					<Dropdown placeholder='Sort by' fluid selection options={sortOptions}/>
					<Radio label='Ascending' name='radioGroup' value='ascending' onChange={this.handleChange} defaultChecked /> {/* AWFUL BUTTONS FIX L8R*/}
					<Radio label='Descending' name='radioGroup' value='descending'  onChange={this.handleChange} />
					{!this.state.movies
						? <p>LOADING</p>
						: <MovieGridList movies={this.state.movies} />
					}
				</div>
            </div>
        )
    }
}

export default List;
