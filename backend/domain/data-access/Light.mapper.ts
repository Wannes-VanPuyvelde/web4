import { Light } from '@prisma/client';
import {LightInput} from '../../types/LightInput'

export const LightMapper = (prismaLight: Light): LightInput => ({
    id: prismaLight.id,
    name: prismaLight.name,
    time_on: prismaLight.time_on,
    light_color: prismaLight.light_color,
});