import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../app/layout';

interface Plant {
  id: number;
  name: string;
  description: string;
}

interface Light {
  id: number;
  name: string;
  light_on: boolean;
  light_color: string;
  plants: Plant[];
}

const Lights = () => {
  const [lights, setLights] = useState<Light[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/lights')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch lights');
        }
        return response.json();
      })
      .then((data) => {
        const sortedData = data.sort((a: Light, b: Light) => a.id - b.id);
        setLights(sortedData);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  if (error) {
    return (
      <Layout>
        <h1>Error</h1>
        <p>{error}</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1>Lights</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Light Color</th>
            <th>Plants</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {lights.map((light) => (
            <tr key={light.id}>
              <td>{light.id}</td>
              <td>{light.name}</td>
              <td>{light.light_on ? 'On' : 'Off'}</td>
              <td>{light.light_color}</td>
              <td>
                {light.plants.map((plant) => (
                  <p key={plant.id}>{plant.name}</p>
                ))}
              </td>
              <td>
                <Link href={`/lights/edit?id=${light.id}`} as={`/lights/edit/${light.id}`}>
                  Edit
                </Link>
              </td>
              <td>
                <Link href={`/lights/delete?id=${light.id}`} as={`/lights/delete/${light.id}`}>
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Lights;
