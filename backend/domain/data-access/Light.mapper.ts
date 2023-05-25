import { Light } from '@prisma/client';
import { LightInput } from '../../types/LightInput'
import { PlantBasicInput } from '../../types/PlantInput';

export const LightMapper = (prismaLight: Light): LightInput => ({
    id: prismaLight.id,
    name: prismaLight.name,
    light_on: prismaLight.light_on,
    light_color: prismaLight.light_color,
    plants: prismaLight.plants?.map(plant => ({
        id: plant.id,
        name: plant.name,
        description: plant.description,
    } as PlantBasicInput)),
});