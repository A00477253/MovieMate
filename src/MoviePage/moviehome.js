import React, { useState, useEffect } from 'react';
import './moviehome.css';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Link } from 'react-router-dom';

const FILTERS = {
  location: ['Halifax', 'Toronto'],
  actors: ['Arnold', 'Leonardo'],
  genre: ['Action', 'Thriller', 'Romance']
};

const MovieHome = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    actors: '',
    genre: ''
  });

  const handleFilterChange = (keyVal, value) => {
    setFilters({
      ...filters,
      [keyVal]: value
    });
  };

  useEffect(() => {
    setMovies([


      {
        title: 'Movie 1',
        plot: 'This is movie 1',
        poster_url: 'https://live.staticflickr.com/65535/53365403390_53c39c1ede_o_d.jpg',
        sponsored: true,
        id: 1
      },
      {
        title: 'Movie 2',
        plot: 'This is movie 2',
        poster_url: 'https://live.staticflickr.com/65535/53365403390_53c39c1ede_o_d.jpg',
        id: 2
      },
      {
        title: 'Movie 2',
        plot: 'This is movie 2',
        poster_url: 'https://live.staticflickr.com/65535/53365403390_53c39c1ede_o_d.jpg',
        id: 3,
        sponsored: true
      },
      {
        title: 'Movie 3',
        plot: 'This is movie 2',
        poster_url: 'https://live.staticflickr.com/65535/53365403390_53c39c1ede_o_d.jpg',
        sponsored: true,
        id: 4
      },
      {
        title: 'Movie 2',
        plot: 'This is movie 2',
        poster_url: 'https://live.staticflickr.com/65535/53365403390_53c39c1ede_o_d.jpg',
        id: 5
      },
      {
        title: 'Movie 5',
        plot: 'This is movie 2',
        poster_url: 'https://live.staticflickr.com/65535/53365403390_53c39c1ede_o_d.jpg',
        sponsored: true,
        id: 6
      },
      {
        title: 'Movie 2',
        plot: 'This is movie 2',
        poster_url: 'https://live.staticflickr.com/65535/53365403390_53c39c1ede_o_d.jpg',
        id: 7
      },
      {
        title: 'Movie 7',
        plot: 'This is movie 2',
        poster_url: 'https://live.staticflickr.com/65535/53365403390_53c39c1ede_o_d.jpg',
        sponsored: true,
        id: 8
      },
      {
        title: 'Movie 2',
        plot: 'This is movie 2',
        poster_url: 'https://live.staticflickr.com/65535/53365403390_53c39c1ede_o_d.jpg',
        id: 9
      }
    ]);
  }, []);

  useEffect(() => {
    if (filters.actors === '' && filters.genre === '' && filters.location === '') {
      setFilteredMovies(movies.filter(movie => movie.sponsored));
    } else {
      setFilteredMovies(movies);
    }
  }, [movies, filters]);

  return (
    <div>
      <div className="movie-filters-container">
        {Object.entries(FILTERS).map(([key, value]) => {
          return (
            <FormControl className="filter-dropdown" key={key}>
              <InputLabel id={`filter-label-${key}`}>{key}</InputLabel>
              <Select
                labelId={`filter-label-${key}`}
                id={`filter-select-${key}`}
                label={key}
                onChange={(e) => handleFilterChange(key, e.target.value)}
              >
                <MenuItem value="">Select {key}</MenuItem>
                {value.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        })}
      </div>
      <div className="movie-grid">
        {filteredMovies.map((movie, index) => (
          <Link to={`/movie/${movie.id}`}>
          <div className="movie-card" key={index}>
            {<img src={movie.poster_url} alt={movie.title} />}
            <h2>{movie.title}</h2>
            <p>{movie.plot}</p>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieHome;
