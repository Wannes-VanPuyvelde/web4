import { Plant, PrismaClient } from '@prisma/client';
import { PlantInput } from '../../types/PlantInput';

export const plantMapper = (prismaPlant: Plant): PlantInput => ({
    id: prismaPlant.id,
    name: prismaPlant.name,
    description: prismaPlant.description,
});
