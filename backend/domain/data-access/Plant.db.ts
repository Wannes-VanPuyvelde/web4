import { PrismaClient } from '@prisma/client';
import { Plant } from '../model/plant';
import { plantMapper } from './plant.mapper';
import { PlantInput } from '../types';

const database = new PrismaClient();

const getAllPlants = async (): Promise<Plant[]> => {
    try {
        const prismaPlants = await database.plant.findMany();
        return prismaPlants.map(plantMapper);
    } catch (error) {
        throw new Error('Error getting plants from database');
    }
};

// const getPlantById = async ({id}: PlantInput): Promise<Plant> => {
//     try{
//         const prismaPlant = await database.plant.findUnique({
//             where: {
//                 id: parseInt(id)
//             }
//         });
//         return plantMapper(prismaPlant);
//     }
//     catch(error){
//         throw new Error("Error getting plant from database");
//     }
// };

const addPlant = async ({
    name,
    description,
}: {
    name: string;
    description: string;
}): Promise<Plant> => {
    try {
        const prismaPlant = await database.plant.create({
            data: {
                name,
                description,
            },
        });

        return plantMapper(prismaPlant);
    } catch (error) {
        throw new Error('Error adding plant to database');
    }
};

export default { getAllPlants, addPlant };
