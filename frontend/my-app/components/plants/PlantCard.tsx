import React from 'react';
import { Plant } from '../../types/Plant';

interface PlantCardProps {
  plant: Plant;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant }) => {
  return (
    <div>
      <h3>{plant.name}</h3>
      <p>{plant.description}</p>
    </div>
  );
};

export default PlantCard;
