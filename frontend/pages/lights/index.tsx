import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../app/layout';

interface Light {
  id: number;
  name: string;
  time_on: number;
  light_color: string;
}

const Lights = () => {
  const [lights, setLights] = useState<Light[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/lights')
      .then((response) => response.json())
      .then((data) => {
        // Sort the lights by id
        const sortedData = data.sort((a: Light, b: Light) => a.id - b.id);
        setLights(sortedData);
      });
  }, []);

  return (
    <Layout>
      <h1>Lights</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Time On</th>
            <th>Light Color</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {lights.map((light) => (
            <tr key={light.id}>
              <td>{light.id}</td>
              <td>{light.name}</td>
              <td>{light.time_on}</td>
              <td>{light.light_color}</td>
              <td>
                <Link href={`/lights/edit?id=${light.id}`} as={`/lights/edit/${light.id}`}>
                  Edit
                </Link>
              </td>
              <td>
                <Link href={`/lights/delete?id=${light.id}`} as={`/lights/delete/${light.id}`}>
                  X
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
