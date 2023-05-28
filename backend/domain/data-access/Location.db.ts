import { PrismaClient } from '@prisma/client';
import { Location } from '../model/Location'
import { locationMapper} from './Location.mapper'

const database = new PrismaClient();

const getAllLocations = async (): Promise<Location[]> =>{
    try {
        const prismaLocation = await database.location.findMany();
        return prismaLocation.map(locationMapper);
    } catch (error) {
        throw new Error('Error getting locations from database');
    }
}

const getLocationById = async ({ id }: { id: number }): Promise<Location> => {
    try {
        const prismaLocation = await database.location.findUnique({
            where: {
                id: id,
            },
        });
        return locationMapper(prismaLocation);
    } catch (error) {
        throw new Error('Error getting location from database');
    }
};

const addLocation = async ({
    name,
    description,
    street,
    number,
    town,
}: {
    name: string;
    description: string;
    street: string;
    number: number;
    town: string;
}): Promise<Location> => {
    try {
        const prismaLocation = await database.location.create({
            data: {
                name,
                description,
                street,
                number,
                town,
            },
        });

        return locationMapper(prismaLocation);
    } catch (error) {
        throw new Error('Error adding location to database');
    }
};

const deleteLocation = async ({ id }: { id: number }): Promise<Location> => {
    try {
        const prismaLocation = await database.location.delete({
            where: {
                id: id,
            },
        });
        return locationMapper(prismaLocation);
    } catch (error) {
        throw new Error('Error deleting location from database');
    }
};

const updateLocation = async ({ id, name, description, street, number, town }) => {
    const prismaLocation = await database.location.update({
        where: { id },
        data: {
            id,
            name,
            description,
            street,
            number,
            town,
        },
    });
    return locationMapper(prismaLocation);
};

export default { getAllLocations, addLocation, getLocationById, deleteLocation, updateLocation };
