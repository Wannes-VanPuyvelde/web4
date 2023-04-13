import { PrismaClient } from '@prisma/client';
import { Plant } from '../model/plant';
import { plantMapper } from './plant.mapper';
import { PlantInput } from '../../types/PlantInput';

const database = new PrismaClient();

const plants: Plant[] = [Plant.create({ name: 'bloempje', description: 'Heel mooie bloem.' })];

const getAllPlants = async (): Promise<Plant[]> => {
    try {
        const prismaPlants = await database.plant.findMany();
        return prismaPlants.map(plantMapper);
    } catch (error) {
        throw new Error('Error getting plants from database');
    }
};

const getPlantById = async ({ id }: { id: number }): Promise<Plant> => {
    try {
        const prismaPlant = await database.plant.findUnique({
            where: {
                id: id,
            },
        });
        return plantMapper(prismaPlant);
    } catch (error) {
        throw new Error('Error getting plant from database');
    }
};

const addPlant = async ({name,description,}: 
    {
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

const deletePlant = async ({ id }: { id: number }): Promise<Plant> => {
    try {
        const prismaPlant = await database.plant.delete({
            where: {
                id: id,
            },
        });
        return plantMapper(prismaPlant);
    } catch (error) {
        throw new Error('Error deleting plant from database');
    }
};

const updatePlant = async ({ id, name, description }) => {
    const prismaPlant = await database.plant.update({
        where: { id },
        data: {
            name,
            description,
        },
    });
    return plantMapper(prismaPlant);
};

export default { getAllPlants, addPlant, getPlantById, deletePlant, updatePlant };
