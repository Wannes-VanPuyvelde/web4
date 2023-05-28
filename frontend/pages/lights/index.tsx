import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const [lights, setLights] = useState<Light[]>([]);
  const token = typeof window !== 'undefined' ? window.sessionStorage.getItem('jwtToken') : '';

  useEffect(() => {
    if (!token) {
      router.push('/'); 
    }
  }, [token, router]);

  useEffect(() => {
    fetch('http://localhost:3000/lights', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
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
