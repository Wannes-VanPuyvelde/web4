import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../app/layout';

interface Light {
  id: number;
  name: string;
  light_on: boolean;
  light_color: string;
}

const EditLight = () => {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState('');
  const [light_on, setLightOn] = useState(false);
  const [light_color, setLightColor] = useState('');

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/lights/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setName(data.name);
          setLightOn(data.light_on);
          setLightColor(data.light_color);
        });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(`http://localhost:3000/lights/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, light_on, light_color }), // Updated variable name
    });

    router.push('/lights');
  };

  return (
    <Layout>
      <h1>Edit Light</h1>
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
          Light On:
          <input
            type="checkbox"
            checked={light_on}
            onChange={(e) => setLightOn(e.target.checked)}
          />
        </label>
        <br />
        <label>
          Light Color:
          <input
            type="text"
            value={light_color}
            onChange={(e) => setLightColor(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Update Light</button>
      </form>
    </Layout>
  );
};

export default EditLight;
