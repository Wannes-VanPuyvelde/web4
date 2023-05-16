import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Plant {
  id: number;
  name: string;
}

const Plants = () => {
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/plants')
      .then((response) => response.json())
      .then((data) => setPlants(data));
  }, []);

  return (
    <div>
      <h1>Plants</h1>
      <ul>
        {plants.map((plant) => (
          <li key={plant.id}>{plant.name}</li>
        ))}
      </ul>
      <Link to="/plants/add">Add Plant</Link>
    </div>
  );
};

export default Plants;
