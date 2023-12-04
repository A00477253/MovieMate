import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddGenre.css';

const AddGenre = () => {
  const navigate = useNavigate();

  const [genreData, setGenreData] = useState({
    name: '',
    description: '',
  });

  const handleChange = (e) => {
    setGenreData({ ...genreData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    fetch('https://moviemate.azurewebsites.net/api/Genre', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(genreData)
    })
      .then(response => {
        if (response.ok) {
          console.log('Genre added successfully');
          navigate('/movieHome'); // Navigate to /movieHome
        } else {
          console.error('Error adding genre');
        }
      })
      .catch(error => console.error('Error:', error));;
        navigate('/movieHome'); // Navigate to /movieHome
  };

  return (
    <div className="container">
      <h1>Add Genre</h1>
      <form>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={genreData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={genreData.description}
          onChange={handleChange}
          required
        ></textarea>

        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddGenre;
