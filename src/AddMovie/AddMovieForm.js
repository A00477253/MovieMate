import React, { useEffect, useState } from 'react';
import './AddMovieForm.css';
import { useNavigate } from 'react-router-dom';

const AddMovieForm = ({ onAddMovie }) => {
  const navigate = useNavigate();

  const [promoteMovie, setPromoteMovie] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: '',
    synopsis: '',
    trailer: '',
    releaseDate: new Date().toISOString(),
    poster: '',
    genre: '',
    actor: '',
  });
  const [actors, setActors] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const response = await fetch('https://moviemate.azurewebsites.net/api/Actor');
        if (response.ok) {
          const actorData = await response.json();
          console.log(JSON.stringify(actorData));
          setActors(actorData);
        } else {
          console.error('Error fetching actors:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching actors:', error.message);
      }
    };

    const fetchGenres = async () => {
      try {
        const response = await fetch('https://moviemate.azurewebsites.net/api/Genre');
        if (response.ok) {
          const genreData = await response.json();
          console.log(JSON.stringify(genreData));
          setGenres(genreData);
        } else {
          console.error('Error fetching genres:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching genres:', error.message);
      }
    };

    fetchActors();
    fetchGenres();
  }, []);

  const handleCheckboxChange = (e) => {
    setPromoteMovie(e.target.checked);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Special handling for actor and genre fields
    if (name === 'actor') {
      const selectedActor = actors.find((actor) => actor.name === value);
      if (selectedActor) {
        setNewMovie({
          ...newMovie,
          actor: value,
          actorId: selectedActor.id,
        });
      }
    } else if (name === 'genre') {
      const selectedGenre = genres.find((genre) => genre.name === value);
      if (selectedGenre) {
        setNewMovie({
          ...newMovie,
          genre: value,
          genreId: selectedGenre.id, // Use the genre ID instead of the name
        });
      }
    } else {
      setNewMovie({
        ...newMovie,
        [name]: value,
      });
    }
  };

const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', newMovie.title); 
      formData.append('synopsis', newMovie.synopsis);
      formData.append('trailerUrl', newMovie.trailer);
      formData.append('image', newMovie.poster);
      formData.append('promoteMovie', promoteMovie);
      formData.append('actorId', newMovie.actorId);
      formData.append('genreId', newMovie.genreId);
      console.log(formData);
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
          Title:
          <input
            type="text"
            name="title"
            value={newMovie.title}
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
          Trailer URL:
          <input
            type="url"
            name="trailer"
            value={newMovie.trailer}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Release Date:
          <input
            type="date"
            name="releaseDate"
            value={newMovie.releaseDate}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Poster (Image URL):
          <input
            type="url"
            name="poster"
            value={newMovie.poster}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Genre:
          <select
            name="genre"
            value={newMovie.genre}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>Select a genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Actor:
          <select
            name="actor"
            value={newMovie.actor}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>Select an actor</option>
            {actors.map((actor) => (
              <option key={actor.id} value={actor.name}>
                {actor.name}
              </option>
            ))}
          </select>
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