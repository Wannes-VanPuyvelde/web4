import { PrismaClient } from "@prisma/client";
import { Light } from "../model/Light";
import { LightMapper } from "./Light.mapper";
import { LightInput } from "../../types/LightInput";



const database = new PrismaClient();

const getAllLights = async (): Promise<Light[]> => {
    try{
        const prismaLight = await database.light.findMany();
        return prismaLight.map(LightMapper);
    }
    catch(error){
        throw new Error('Error getting lights from database')
    }
};

const getLightById = async ({id}: {id:number}): Promise<Light> => {
    try {
        const prismaLight = await database.light.findUnique({
            where: {
                id: id,
            },
        });
        return LightMapper(prismaLight);
    } catch (error) {
        throw new Error('Error getting Light from database');
    }
}

const addLight = async ({
    name,
    time_on,
    light_color,
}: {
    name: string;
    time_on: number;
    light_color: string;
}): Promise<Light> => {
    try {
        const prismaLight = await database.light.create({
            data: {
                name,
                time_on,
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

const updateLight = async ({ id, name, time_on, light_color }) => {
    const prismaLight = await database.light.update({
        where: { id },
        data: {
            id,
            name,
            time_on,
            light_color,
        },
    });
    return LightMapper(prismaLight);
};

export default { getAllLights, addLight, getLightById, deleteLight, updateLight}