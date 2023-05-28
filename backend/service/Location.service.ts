import { Location } from '../domain/model/Location';
import locationDB from '../domain/data-access/Location.db';
import { LocationInput } from '../types/LocationInput';

const getAllLocations = async (): Promise<Location[]> => {
    try {
        const locations = await locationDB.getAllLocations();
        return locations;
    } catch (error) {
        throw new Error(error);
    }
};

const getLocationById = async (id: number): Promise<Location> => {
    if (Number.isNaN(Number(id))) throw new Error('Id must be a number');

    const location = await locationDB.getLocationById({ id });

    if (!location) throw new Error('Location not found');

    return location;
};

const deleteLocation = async (id: number): Promise<Location> => {
    if (Number.isNaN(Number(id))) throw new Error('Id must be a number');
  
    const location = await locationDB.getLocationById({ id });
  
    if (!location) throw new Error('Location not found');
  
    const deletedLocation = await locationDB.deleteLocation({ id });
  
    return deletedLocation;
  };
  


const updateLocation = async (id: number, name: string, description: string, street: string, number: number, town: string): Promise<Location> => {
    if (Number.isNaN(Number(id))) throw new Error('Id must be a number');

    const location = await locationDB.updateLocation({ id, name, description, street, number, town });

    return location;
};

const addLocation = async (name: string, description: string, street: string, number: number, town: string): Promise<Location> => {
    const location = await locationDB.addLocation({ name, description, street, number, town });

    return location;
};

const linkPlantToLocation = async (plantLocation: { plantId: number, locationId: number }): Promise<Location> => {
    const location = await locationDB.linkPlantToLocation(plantLocation);
    return location;
};

const unlinkPlantFromLocation = async (plantLocation: { plantId: number, locationId: number }): Promise<Location> => {
    const location = await locationDB.unlinkPlantFromLocation(plantLocation);
    return location;
};


export default { getAllLocations, getLocationById, deleteLocation, updateLocation, addLocation, linkPlantToLocation, unlinkPlantFromLocation };
