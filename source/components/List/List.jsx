// https://www.youtube.com/watch?v=YRiMo2EjVds
// https://www.youtube.com/watch?v=HUUuzPenAIs

import React, { Component } from 'react';
import { Button, Input, Segment, Dropdown, Form, Radio, Image, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

import Detail from '../Detail/Detail.jsx';
import history from '../history.jsx'

require('./List.scss');

const sortOptions = [
	{ value: 'name', text: 'Name' },
	{ value: 'rating', text: 'Rating'},
]

function searchingFor(search) {
	return function(x) {
		return x.name.toLowerCase().includes(search.toLowerCase()) || !search;
	}
}

function comparisonFunction(sortby, radio) {
	if(sortby == 'name') {
		if(radio == 'ascending') {
			return function(a, b) {
				if(a.name.toLowerCase() < b.name.toLowerCase())
					return -1;
				if(a.name.toLowerCase() > b.name.toLowerCase())
					return 1;
				return 0;
			}
		}
		else {
			return function(a, b) {
				if(b.name.toLowerCase() < a.name.toLowerCase())
					return -1;
				if(b.name.toLowerCase() > a.name.toLowerCase())
					return 1;
				return 0;
			}
		}
	}
	else {
		if(radio == 'ascending') {
			return function(a, b) {
				return a.vote_average - b.vote_average;
			}
		}
		else  {
			return function(a, b) {
				return b.vote_average - a.vote_average;
			}
		}
	}
}

function MovieGridList(props) {
	return(
		<ul className='popular-list-list'>
			{props.movies.filter(searchingFor(props.search)).sort(comparisonFunction(props.sortby, props.radio)).map( function(movie, index) {
				if(movie.poster_path != null && props.search != '') {
					return (
						<div key={movie.id} className='card' onClick={()=>history.push("/detail/"+movie.id)}>
							<Grid>
								<Grid.Column width={4}>
									<li className='popular-item-list'>
										<Image className='picture-list' src={"https://image.tmdb.org/t/p/w500"+ movie.poster_path} size='tiny'/>
									</li>
								</Grid.Column>
								<Grid.Column width={12} >
									<h4 className='title'>{movie.name}</h4>
									<h4 className='rating'>{'Rating: ' + movie.vote_average}</h4>
								</Grid.Column>
							</Grid>
						</div>
					)
				}
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
			search: '',
			sortby: sortOptions[0].value,
			radio: 'ascending',
		};

		this.searcHandler = this.searchHandler.bind(this);
		this.sortHandler = this.sortHandler.bind(this);
		this.radioHandler = this.radioHandler.bind(this);
	}
	searchHandler(event) {
		this.setState({search: event.target.value});
	}
	sortHandler(event, data: any) {
		this.setState({sortby: data.value});
	}
	radioHandler(event, data: any) {
		this.setState({radio: data.value});
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
				//console.log(this.state.movies)
			})
	}
    render() {
        return(
            <div className="List">
				<div className="container">
                	<Input placeholder='Search' fluid value={this.state.search} onChange={this.searchHandler.bind(this)}/>
					<Dropdown fluid selection options={sortOptions} defaultValue={sortOptions[0].value} onChange={this.sortHandler.bind(this)}/>
					<Radio label='Ascending' name='radioGroup' value='ascending' onChange={this.radioHandler.bind(this)} checked={this.state.radio=='ascending'}/> {/* AWFUL BUTTONS FIX L8R*/}
					<Radio label='Descending' name='radioGroup' value='descending'  onChange={this.radioHandler.bind(this)} checked={this.state.radio=='descending'}/>
					{!this.state.movies
						? <p>LOADING</p>
						: <MovieGridList movies={this.state.movies} search={this.state.search} sortby={this.state.sortby} radio={this.state.radio}/>
					}
				</div>
            </div>
        )
    }
}

List.propTypes = {
	movies: PropTypes.arrayOf(PropTypes.object),
	search: PropTypes.string,
	sortby: PropTypes.string,
	radio: PropTypes.string,
}

export default List;
