import { Plant, PlantLight } from '../domain/model/Plant';
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

const linkLightToPlant = async (plantLight: PlantLight): Promise<Plant> => {
    const plant = await plantDB.linkLightToPlant(plantLight);
    return plant;
};

const unlinkLightFromPlant = async (plantLight: PlantLight): Promise<Plant> => {
    const plant = await plantDB.unlinkLightFromPlant(plantLight);
    return plant;
};

export default { getAllPlants, getPlantById, deletePlant, updatePlant, addPlant, linkLightToPlant, unlinkLightFromPlant };
