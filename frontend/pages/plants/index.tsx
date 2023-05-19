import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../app/layout';

interface Plant {
  id: number;
  name: string;
  description: string;
}

const Plants = () => {
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/plants')
      .then((response) => response.json())
      .then((data) => setPlants(data));
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
                <Link href={`/plants/edit?id=${plant.id}`} as={`/plants/edit/${plant.id}`}>
                  Edit
                </Link>
              </td>
              <td>
                <Link href={`/plants/delete?id=${plant.id}`} as={`/plants/delete/${plant.id}`}>
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

export default Plants;
