import { Location } from '@prisma/client';
import { LocationInput } from '../../types/LocationInput'
import { plantMapper } from './Plant.mapper';

export const locationMapper = (prismaLocation: Location): LocationInput => ({
    id: prismaLocation.id,
    name: prismaLocation.name,
    description: prismaLocation.description,
    street: prismaLocation.street,
    number: prismaLocation.number,
    town: prismaLocation.town,
    plants: prismaLocation.plants ? prismaLocation.plants.map(plantMapper) : [],
});
