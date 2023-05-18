import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../app/layout';

interface Plant {
  id: number;
  name: string;
  description: string;
}

const EditPlant = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3000/plants/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
        setDescription(data.description);
      });
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`http://localhost:3000/plants/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
    }).then(() => {
      console.log('Plant updated');
    });
  };

  return (
    <Layout>
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
        <br />
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Update Plant</button>
      </form>
    </Layout>
  );
};

export default EditPlant;
