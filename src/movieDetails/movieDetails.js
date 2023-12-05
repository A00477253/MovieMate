import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';

import './MovieDetails.css'; // Import the CSS file for styling

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Use the useNavigate hook
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://moviemate.azurewebsites.net/api/Movie/${id}`);
        if (response.ok) {
          const data = await response.json();
          setMovieDetails(data);
        } else {
          console.error('Error fetching movie details');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleBackButtonClick = () => {
    // Navigate back to the /movieHome page
    navigate('/movieHome');
  };

  if (!movieDetails) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="movie-details-container">
      <ReactPlayer
        className="trailer-video"
        url={movieDetails.trailer}
        controls
        width="100%"
        height="100%"
      />

      <div className="movie-card">
        <img className="poster-image" src={movieDetails.poster} alt="Movie Poster" />
        </div>

        <div className="movie-info">
          <h2>{movieDetails.title}</h2>
          <p className="synopsis">Synopsis: {movieDetails.synopsis}</p>
          <p className="genre">Genre: {movieDetails.genreID}</p>
          <p className="average-rating">Average Rating: {movieDetails.averageRating}</p>
          {/* Add more details as needed */}
        </div>
     

      {/* Back button */}
      <button className="back-button" onClick={handleBackButtonClick}>
        Back to Movie Home
      </button>
    </div>
  );
};

export default MovieDetails;
