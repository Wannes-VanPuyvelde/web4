import { useState, useEffect } from 'react';
import { Plant } from '../../types/Plant';
import plantService from '../../services/PlantService';
import PlantsList from '../../components/plants/PlantList';

const PlantsPage = () => {
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    plantService.getAllPlants().then(setPlants);
  }, []);

  return (
    <div>
      <h1>Plants</h1>
      <PlantsList plants={plants} />
    </div>
  );
};

export default PlantsPage;
