import axios from 'axios';

module.exports = {
	fetchPictures: function(poster_path) { // change to fat arrow function??
		let encodedURI = window.encodeURI('https://image.tmdb.org/t/p/w500' + poster_path);
		return axios.get(encodedURI)
			.then(function(response) {
				return response
			})
	}
}
