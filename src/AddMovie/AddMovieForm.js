import React, { useState } from 'react';
import './AddMovieForm.css';
import { useNavigate } from 'react-router-dom';



const AddMovieForm = ({ onAddMovie }) => {
  const navigate = useNavigate();

  const [promoteMovie, setPromoteMovie] = useState(false);
  const [newMovie, setNewMovie] = useState({
    name: '',
    synopsis: '',
    image: null,
    trailerUrl: ''
  });



  const handleCheckboxChange = (e) => {
    setPromoteMovie(e.target.checked);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({
      ...newMovie,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setNewMovie({
      ...newMovie,
      image: imageFile,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', newMovie.name);
      formData.append('synopsis', newMovie.synopsis);
      formData.append('trailerUrl', newMovie.trailerUrl);
      formData.append('image', newMovie.image);
      formData.append('promoteMovie', promoteMovie);
      console.log(formData);
      const formDataObject = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });

      console.log(JSON.stringify(formDataObject));

      if (!promoteMovie) {

        const response = await fetch('YOUR_ADD_MOVIE_API_ENDPOINT', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('Movie added successfully');
          setNewMovie({
            name: '',
            synopsis: '',
            image: null,
            trailerUrl: '',
          });
          setPromoteMovie(false); 
        } else {
          console.error('Error adding movie:', response.statusText);
        }
      } else {

        navigate('/payment', { state: { formData: Object.fromEntries(formData.entries()) } });
      }

    }
    catch (error) {
      console.error('Error adding movie:', error.message);
    }};

    return (
      <div className="add-movie-form">
        <h3>Add a New Movie</h3>
        <form onSubmit={handleFormSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={newMovie.name}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            Synopsis:
            <textarea
              name="synopsis"
              value={newMovie.synopsis}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            Image:
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </label>

          <label>
            Trailer URL:
            <input
              type="url"
              name="trailerUrl"
              value={newMovie.trailerUrl}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            Promote Movie ($1000):
            <input
              type="checkbox"
              name="promoteMovie"
              checked={promoteMovie}
              onChange={handleCheckboxChange}
            />
          </label>

          <button type="submit">Add Movie</button>
        </form>
      </div>
    );
  };

  export default AddMovieForm;
