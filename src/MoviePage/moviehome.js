import React, { useState, useEffect } from 'react';
import './moviehome.css';

const MovieHome = () => {
 const [movies, setMovies] = useState([]);

 useEffect(() => {
    setMovies([
        

        {
            title: 'Movie 1',
            plot: 'This is movie 1',
            poster_url :'https://live.staticflickr.com/65535/53365403390_53c39c1ede_o_d.jpg' ,
          },
          {
            title: 'Movie 2',
            plot: 'This is movie 2',
            poster_url : 'https://live.staticflickr.com/65535/53365403390_53c39c1ede_o_d.jpg',
          },
          {
            title: 'Movie 2',
            plot: 'This is movie 2',
            poster_url : 'https://live.staticflickr.com/65535/53365403390_53c39c1ede_o_d.jpg',
          },
          {
            title: 'Movie 2',
            plot: 'This is movie 2',
            poster_url : 'https://live.staticflickr.com/65535/53365403390_53c39c1ede_o_d.jpg',
          },
          {
            title: 'Movie 2',
            plot: 'This is movie 2',
            poster_url : 'https://live.staticflickr.com/65535/53365403390_53c39c1ede_o_d.jpg',
          },
          {
            title: 'Movie 2',
            plot: 'This is movie 2',
            poster_url : 'https://live.staticflickr.com/65535/53365403390_53c39c1ede_o_d.jpg',
          },
          {
            title: 'Movie 2',
            plot: 'This is movie 2',
            poster_url : 'https://live.staticflickr.com/65535/53365403390_53c39c1ede_o_d.jpg',
          },
          {
            title: 'Movie 2',
            plot: 'This is movie 2',
            poster_url : 'https://live.staticflickr.com/65535/53365403390_53c39c1ede_o_d.jpg',
          },
          {
            title: 'Movie 2',
            plot: 'This is movie 2',
            poster_url : 'https://live.staticflickr.com/65535/53365403390_53c39c1ede_o_d.jpg',
          }
    ]);
 }, []);

 return (
    <div className="movie-grid">
      {movies.map((movie, index) => (
        <div className="movie-card" key={index}>
          {<img src={movie.poster_url} alt={movie.title} /> }
          <h2>{movie.title}</h2>
          <p>{movie.plot}</p>
        </div>
      ))}
    </div>
 );
};

export default MovieHome;