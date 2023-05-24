import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../app/layout';

const AddLight = () => {
  const [name, setName] = useState('');
  const [light_on, setLightOn] = useState(false); // Updated to boolean
  const [light_color, setLightColor] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch('http://localhost:3000/lights/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, light_on, light_color }), // Updated variable name
    });

    router.push('/lights');
  };

  return (
    <Layout>
      <h1>Add Light</h1>
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
        <button type="submit">Add Light</button>
      </form>
    </Layout>
  );
};

export default AddLight;
