import React, { useState, useEffect } from 'react';
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
      <ul>
        {plants.map((plant) => (
          <li key={plant.id}>
            <strong>ID:</strong> {plant.id}, <strong>Name:</strong> {plant.name}, <strong>Description:</strong> {plant.description}
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Plants;
