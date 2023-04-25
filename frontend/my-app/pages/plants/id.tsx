import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Plant } from '../../types/Plant';
import plantService from '../../services/PlantService';
import PlantForm from '../../components/plants/PlantForm';

const PlantPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [plant, setPlant] = useState<Plant | null>(null);

  useEffect(() => {
    if (id) {
      plantService.getPlantById(Number(id)).then(setPlant);
    }
  }, [id]);

  const handleUpdate = async (updatedPlant: Plant) => {
    await plantService.updatePlant(updatedPlant);
    router.push('/plants');
  };

  const handleDelete = async () => {
    if (plant) {
      await plantService.deletePlant(plant.id);
      router.push('/plants');
    }
  };

  if (!plant) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <PlantForm onSubmit={handleUpdate} plant={plant} />
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default PlantPage;
