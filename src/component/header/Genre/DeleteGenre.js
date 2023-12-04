import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeleteGenre.css';

const DeleteGenre = () => {
  const navigate = useNavigate();

  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    // Uncomment this section for API integration
    fetch('https://moviemate.azurewebsites.net/api/Genre')
      .then(response => response.json())
      .then(data => setGenres(data))
      .catch(error => console.error('Error fetching genres:', error));
  }, []);

  const handleGenreSelection = (genreId) => {
    const genre = genres.find(genre => genre.id === genreId);
    setSelectedGenre(genre);
  };

  const handleDelete = () => {
    if (!selectedGenre) return;

    // Uncomment this section for API integration
    fetch(`https://moviemate.azurewebsites.net/api/Genre/${selectedGenre.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          console.log('Genre deleted successfully');
          navigate('/movieHome'); // Navigate to /movieHome
        } else {
          console.error('Error deleting genre');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="delete-genre-container">
      <h1>Delete Genre</h1>
      <div className="genre-list-container">
        <label htmlFor="genreList">Select a Genre:</label>
        <select
          id="genreList"
          onChange={(e) => handleGenreSelection(Number(e.target.value))}
        >
          <option value="">Select a genre</option>
          {genres && genres.map(genre => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </div>
      {selectedGenre && (
        <div className="selected-genre-container">
          <h2>{selectedGenre.name}</h2>
          <p>Description: {selectedGenre.description}</p>
          <button onClick={handleDelete}>Delete Genre</button>
        </div>
      )}
    </div>
  );
};

export default DeleteGenre;
