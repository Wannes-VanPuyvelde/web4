import { useRouter } from 'next/router';
import PlantForm from '../../components/plants/PlantForm';
import plantService from '../../services/PlantService';
import { Plant } from '../../types/Plant';

const NewPlantPage = () => {
  const router = useRouter();

  const handleSubmit = async (plant: Plant) => {
    await plantService.addPlant(plant);
    router.push('/plants');
  };

  return (
    <div>
      <h1>New Plant</h1>
      <PlantForm onSubmit={handleSubmit} />
    </div>
  );
};

export default NewPlantPage;
