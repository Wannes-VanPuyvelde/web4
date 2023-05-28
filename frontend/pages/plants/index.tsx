import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../app/layout';

interface Light {
  id: number;
  name: string;
  light_on: boolean;
  light_color: string;
}
interface Plant {
  id: number;
  name: string;
  description: string;
  lights: Light[];
}

const Plants = () => {
  const router = useRouter();
  const [plants, setPlants] = useState<Plant[]>([]);
  const token = typeof window !== 'undefined' ? window.sessionStorage.getItem('jwtToken') : '';

  useEffect(() => {
    if (!token) {
      router.push('/'); 
    }
  }, [token, router]);

  useEffect(() => {
    
    fetch('http://localhost:3000/plants', {
      headers: {
        'Authorization': `Bearer ${token}`, // where `token` is your JWT
      }
    })
      .then((response) => response.json())
      .then((data) => {
        // Sort the plants by id
        const sortedData = data.sort((a: Plant, b: Plant) => a.id - b.id);
        setPlants(sortedData);
      });
    }, []);

return (
  <Layout>
    <h1>Plants</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Lights</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {plants.map((plant) => (
          <tr key={plant.id}>
            <td>{plant.id}</td>
            <td>{plant.name}</td>
            <td>{plant.description}</td>
            <td>
              {plant.lights.map((light) => (
                <p key={light.id}>{light.name}</p>
              ))}
            </td>
            <td>
              <Link href={`/plants/edit?id=${plant.id}`} as={`/plants/edit/${plant.id}`}>
                Edit
              </Link>
            </td>
            <td>
              <Link href={`/plants/delete?id=${plant.id}`} as={`/plants/delete/${plant.id}`}>
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

export default Plants;
