import React from 'react';
import Tile from './Tile';
import {Fetch} from 'react-request';

class MovieList extends React.Component {
	
	constructor(props) {
		super(props);
		this.state =
		{
			movieLinkList: [],
		}
	}
	populateMll(list) {
		this.setState(
			{
				movieLinkList: list,
			}
		)
	}
	async componentDidMount() {

		fetch('http://www.imdb.com/chart/top')
        .then(response => response.json())
        .then(data =>{ console.log("Data",data)});


			

	}
	render() {
		return (
			<div>
				<h1>Component Loaded</h1>

				<Tile name="Se7en" posterSrc="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRod45bAdo2Os6THPDA2qDH2qIwNtqBlrjfZGGn_J2ppx6DIhhU" rating="8.2" />
				<Tile />
				<div> {this.state.movieLinkList}</div>
			</div>

		)
	}
}
export default MovieList;