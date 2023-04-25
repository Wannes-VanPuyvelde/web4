import React from 'react';
import { Plant } from '../../types/Plant';
import PlantCard from './PlantCard';

interface PlantsListProps {
  plants: Plant[];
}

const PlantsList: React.FC<PlantsListProps> = ({ plants }) => {
  return (
    <div>
      {plants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} />
      ))}
    </div>
  );
};

export default PlantsList;
