import './App.css';
import React, { useEffect, useState } from 'react';
import Tile from './components/Tile';


const API_KEY = "2dc97966f3cb1e2da015441ef512b5fe";
const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?api_key=2dc97966f3cb1e2da015441ef512b5fe&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate";
const IMG_API = "https://image.tmdb.org/t/p/w500";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + "&language=en-US&page=1&include_adult=false";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState(' ');
  useEffect(() => {
    fetch(FEATURED_API)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setMovies(data.results);
      });

  }, [])

  function getMovies(sT)
  {
   
    fetch(SEARCH_API + "&query=" + sT)
    .then(res => res.json())
    .then(data => {
      console.log(data);
     
      if(data.results)
      {
        setMovies(data.results);
      }
    })
     
  }

  const searchMovie = (e) => {
    if(searchTerm)
    {
      console.log("E "+ e);
      e.preventDefault();
      fetch(SEARCH_API + "&query=" + searchTerm)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setMovies(data.results);
        })
        setSearchTerm("");
    }
   

  };
  const changeSearchMovie = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    getMovies(e.target.value);
     
  };

  return (
    <div>
      <nav class="navbar navbar-expand-lg ">
        <a class="navbar-brand" href="#"><h2>
          MovieNerd</h2> </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#"><h4>Home</h4> <span class="sr-only">(current)</span></a>
            </li>


          </ul>
          <form class="form-inline my-2 my-lg-0" onSubmit={searchMovie} >
            <input onChange={changeSearchMovie} class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={searchTerm}></input>
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
      <div className="gallery">
        {movies.length > 0 && movies.map((movie) =>
          <Tile name={movie.original_title} overview={movie.overview} posterSrc={movie.poster_path} rating={movie.vote_average} />)}

      </div>
    </div>

  );
}
export default App;