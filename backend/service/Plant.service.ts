import { Plant } from '../domain/model/Plant';
import plantDB from '../domain/data-access/Plant.db';

const getAllPlants = async (): Promise<Plant[]> => {
    try {
        const plants = await plantDB.getAllPlants();
        return plants;
    } catch (error) {
        throw new Error(error);
    }
};

const getPlantById = async ( id : number): Promise<Plant> => {
    if (Number.isNaN(Number(id))) throw new Error('Id must be a number');
  
    const plant = await plantDB.getPlantById({ id});
  
    if (!plant) throw new Error('Plant not found');
  
    return plant;
  };

const deletePlant = async (id: number): Promise<Plant> => {
    if (Number.isNaN(Number(id))) throw new Error('Id must be a number');

    const plant = await plantDB.deletePlant({ id });

    if (!plant) throw new Error('Plant not found');

    return plant;
};

const updatePlant = async (id: number, name: string, description: string): Promise<Plant> => {
    if (Number.isNaN(Number(id))) throw new Error('Id must be a number');

    const plant = await plantDB.updatePlant({ id, name, description });

    return plant;
};



const addPlant = async (name:string, description:string): Promise<Plant> => {
    const plant = await plantDB.addPlant({ name, description });

    return plant;
};

export default { getAllPlants, getPlantById, deletePlant, updatePlant, addPlant};
