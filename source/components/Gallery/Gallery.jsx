//https://www.youtube.com/watch?v=TxqqrNfgTto&t=3s

// DOES MY FILTERING NEED TO BE ABLE TO FILTER w/ MULTIPLE DIFF TYPES?
// The gallery view should also have some kind filtering attribute where users can select one or many attributes and filter the gallery by them (i.e. genres of films or music).

import React, { Component } from 'react';
import { Button, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

//import styles from './Gallery.scss';

require('./Gallery.scss');

let counter=0;
function MovieGridGallery(props) {
	return(
		<ul className='popular-list-gallery'>
			{props.movies.map( function(movie, index) {
				let moviePoster;
				if(movie.genre_ids.length == 0 && currentGenreSort == 0) { // includes movies that have no genre in ALL and that is it
					moviePoster = <img className='picture-gallery' src={"https://image.tmdb.org/t/p/w500"+ movie.poster_path}/>;
				}
				for(var i = 0; i < movie.genre_ids.length; i++) {
					if(movie.genre_ids[i] == currentGenreSort || currentGenreSort == 0) {
						moviePoster = <img className='picture-gallery' src={"https://image.tmdb.org/t/p/w500"+ movie.poster_path}/>;
						console.log(counter+1)
						break;
					}
					else {
						moviePoster = null;
					}
				}
				return (
					<li key={movie.id} className='popular-item-gallery'>
						{moviePoster}
					</li>
				)
			})}
		</ul>
	)
}

MovieGridGallery.propTypes = {
	movies: PropTypes.array.isRequired,
}

let currentGenreSort = 0;

class Gallery extends Component {
	constructor() {
		super();
		this.state = {
			movies: [],
		};
		this.clickHandler = this.clickHandler.bind(this);
	}

	clickHandler(id) {
		currentGenreSort = id;
		this.forceUpdate()
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
        return( // all has to be in one main div
            <div className="Gallery">
				<div className="Genres">
					<Button.Group>
						<Button onClick={()=>this.clickHandler(0)}>All</Button>
						<Button onClick={()=>this.clickHandler(10759)}>Action & Adventure</Button>
						<Button onClick={()=>this.clickHandler(16)}>Animation</Button>
						<Button onClick={()=>this.clickHandler(35)}>Comedy</Button>
						<Button onClick={()=>this.clickHandler(80)}>Crime</Button>
						<Button onClick={()=>this.clickHandler(99)}>Documentary</Button>
						<Button onClick={()=>this.clickHandler(18)}>Drama</Button>
						<Button onClick={()=>this.clickHandler(10751)}>Family</Button>
						<Button onClick={()=>this.clickHandler(10762)}>Kids</Button>
						<Button onClick={()=>this.clickHandler(9648)}>Mystery</Button>
						<Button onClick={()=>this.clickHandler(10763)}>News</Button>
						<Button onClick={()=>this.clickHandler(10764)}>Reality</Button>
						<Button onClick={()=>this.clickHandler(10765)}>Sci-Fi & Fantasy</Button>
						<Button onClick={()=>this.clickHandler(10766)}>Soap</Button>
						<Button onClick={()=>this.clickHandler(10767)}>Talk</Button>
						<Button onClick={()=>this.clickHandler(10768)}>War & Politics</Button>
						<Button onClick={()=>this.clickHandler(37)}>Western</Button>
					</Button.Group>
				</div>

				{!this.state.movies
					? <p>LOADING</p>
					: <MovieGridGallery movies={this.state.movies} />
				}

				{/*{(() => {
					switch (currentGenreSort) {
		        		case 0:	return(<MovieGrid movies={this.state.movies} />);
		        		case 10759:	return(<h3>ACTION</h3>);
		        		case 16:	return(<h3>animation</h3>);
		        		case 35:	return(<h3>comedy</h3>);
		        		case 80:	return(<h3>crime</h3>);
		        		case 99:	return(<h3>doc</h3>);
		        		case 18:	return(<h3>drama</h3>);
		        		case 10751:	return(<h3>family</h3>);
		        		case 10762:	return(<h3>kids</h3>);
		        		case 9648:	return(<h3>mystery</h3>);
		        		case 10763:	return(<h3>news</h3>);
		        		case 10764:	return(<h3>reality</h3>);
		        		case 10765:	return(<h3>scifi</h3>);
		        		case 10766:	return(<h3>soap</h3>);
		        		case 10767:	return(<h3>talk</h3>)
		        		case 10768:	return(<h3>war</h3>);
		        		case 37:	return(<h3>western</h3>);

		        		default:	return(<MovieGrid movies={this.state.movies} />);
					}
				})()}*/}
            </div>
        )
    }
}

export default Gallery;
