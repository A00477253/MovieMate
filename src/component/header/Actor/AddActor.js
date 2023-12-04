import React, { useState } from 'react';
import './AddActor.css';

const AddActor = () => {
  const [actorData, setActorData] = useState({
    name: '',
    birthDate: '',
    biography: '',
    picture: ''
  });

  const handleChange = (e) => {
    setActorData({ ...actorData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    fetch('https://moviemate.azurewebsites.net/api/Actor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(actorData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="container">
      <h1>Add Actor</h1>
      <form>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={actorData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="birthDate">Birth Date:</label>
        <input
          type="date"
          id="birthDate"
          name="birthDate"
          value={actorData.birthDate}
          onChange={handleChange}
          required
        />

        <label htmlFor="biography">Biography:</label>
        <textarea
          id="biography"
          name="biography"
          value={actorData.biography}
          onChange={handleChange}
          required
        ></textarea>

        <label htmlFor="picture">Picture (URL):</label>
        <input
          type="url"
          id="picture"
          name="picture"
          value={actorData.picture}
          onChange={handleChange}
          required
        />

        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddActor;
