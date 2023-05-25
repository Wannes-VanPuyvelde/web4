import { PrismaClient } from "@prisma/client";
import { Light } from "../model/Light";
import { LightMapper } from "./Light.mapper";

const database = new PrismaClient();

const getAllLights = async (): Promise<Light[]> => {
  try {
      const prismaLight = await database.light.findMany({
          include: {
              plants: true,
          },
      });
      return prismaLight.map(LightMapper);
  } catch (error) {
      throw new Error('Error getting lights from database');
  }
};

const getLightById = async ({id}: {id:number}): Promise<Light> => {
  try {
      const prismaLight = await database.light.findUnique({
          where: {
              id: id,
          },
          include: {
              plants: true,
          },
      });
      return LightMapper(prismaLight);
  } catch (error) {
      throw new Error('Error getting Light from database');
  }
}

const addLight = async ({
    name,
    light_on,
    light_color,
}: {
    name: string;
    light_on: boolean;
    light_color: string;
}): Promise<Light> => {
    try {
        const prismaLight = await database.light.create({
            data: {
                name,
                light_on,
                light_color,
            },
        });

        return LightMapper(prismaLight);
    } catch (error) {
        throw new Error('Error adding light to database');
    }
};

const deleteLight = async ({ id }: { id: number }): Promise<Light> => {
    try {
        const prismaLight = await database.light.delete({
            where: {
                id: id,
            },
        });
        return LightMapper(prismaLight);
    } catch (error) {
        throw new Error('Error deleting light from database');
    }
};

const updateLight = async ({ id, name, light_on, light_color }) => {
  const prismaLight = await database.light.update({
      where: { id },
      data: {
          id,
          name,
          light_on,
          light_color,
      },
      include: {
          plants: true,
      },
  });
  return LightMapper(prismaLight);
};

const linkPlantToLight = async ({ lightId, plantId }: { lightId: number, plantId: number}): Promise<Light> => {
    try {
      const prismaLight = await database.light.update({
        where: { id: lightId },
        data: {
          plants: {
            connect: { id: plantId },
          },
        },
        include: {
          plants: true,
        },
      });
      return LightMapper(prismaLight);
    } catch (error) {
      throw new Error('Error linking plant to light in database');
    }
  };

const unlinkPlantFromLight = async ({ lightId, plantId }: { lightId: number, plantId: number}): Promise<Light> => {
  try {
    const prismaLight = await database.light.update({
      where: { id: lightId },
      data: {
        plants: {
          disconnect: { id: plantId },
        },
      },
      include: {
        plants: true,
      },
    });
    return LightMapper(prismaLight);
  } catch (error) {
    throw new Error('Error unlinking plant from light in database');
  }
};  

export default { getAllLights, addLight, getLightById, deleteLight, updateLight, linkPlantToLight, unlinkPlantFromLight };