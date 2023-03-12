import { Plant } from '../domain/model/Plant';
import plantDB from '../domain/data-access/Plant.db';
import { PlantInput } from '../types';

const getAllPlants = async (): Promise<Plant[]> => {
    try {
        const plants = await plantDB.getAllPlants();
        return plants;
    } catch (error) {
        throw new Error(error);
    }
};

// const getPlantById = ({id}: PlantInput): Plant => {
//     if(Number.isNaN(Number(id))) throw new Error('Id must be a number');

//     const plant = plantDB.getPlantById({id: parseInt(id)});

//     if(!plant) throw new Error('Plant not found');

//     return plant;
// };

export default { getAllPlants, getPlantById };
