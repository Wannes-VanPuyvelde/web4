import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditPlant = () => {
  const { id } = useParams();
  const [name, setName] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3000/plants/${id}`)
      .then((response) => response.json())
      .then((data) => setName(data.name));
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`http://localhost:3000/plants/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    }).then(() => {
      console.log('Plant updated');
    });
  };

  return (
    <div>
      <h1>Edit Plant</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="submit">Update Plant</button>
      </form>
    </div>
  );
};

export default EditPlant;
