import { Plant } from '@prisma/client';
import { PlantInput } from '../../types/PlantInput';
import { LightBasicInput } from '../../types/LightInput';

export const plantMapper = (prismaPlant: Plant): PlantInput => ({
    id: prismaPlant.id,
    name: prismaPlant.name,
    description: prismaPlant.description,
    lights: prismaPlant.lights?.map(light => ({
        id: light.id,
        name: light.name,
        light_on: light.light_on,
        light_color: light.light_color,
    } as LightBasicInput)),
});
