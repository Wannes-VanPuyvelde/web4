import { PrismaClient } from '@prisma/client';
import { Plant } from '../model/Plant';
import { plantMapper } from './Plant.mapper';

const database = new PrismaClient();

const getAllPlants = async (): Promise<Plant[]> => {
  try {
      const prismaPlants = await database.plant.findMany({
          include: {
              lights: true,
          },
      });
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
          include: {
              lights: true,
          },
      });
      return plantMapper(prismaPlant);
  } catch (error) {
      throw new Error('Error getting plant from database');
  }
};

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
          id,
          name,
          description,
      },
      include: {
          lights: true,
      },
  });
  return plantMapper(prismaPlant);
};

const linkLightToPlant = async ({ plantId, lightId }: { plantId: number, lightId: number}): Promise<Plant> => {
  try {
    const prismaPlant = await database.plant.update({
      where: { id: plantId },
      data: {
        lights: {
          connect: { id: lightId },
        },
      },
      include: {
          lights: true,
      },
    });
    return plantMapper(prismaPlant);
  } catch (error) {
    throw new Error('Error linking light to plant in database');
  }
};

const unlinkLightFromPlant = async ({ plantId, lightId }: { plantId: number, lightId: number}): Promise<Plant> => {
  try {
    const prismaPlant = await database.plant.update({
      where: { id: plantId },
      data: {
        lights: {
          disconnect: { id: lightId },
        },
      },
      include: {
          lights: true,
      },
    });
    return plantMapper(prismaPlant);
  } catch (error) {
    throw new Error('Error unlinking light from plant in database');
  }
};  

export default { getAllPlants, addPlant, getPlantById, deletePlant, updatePlant, linkLightToPlant, unlinkLightFromPlant };
