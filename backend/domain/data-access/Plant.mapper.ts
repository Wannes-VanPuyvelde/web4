import { Plant } from '../model/Plant';
import prismaPlant from './Plant.db';

export const plantMapper = ({ id, name, description }: typeof prismaPlant): Plant =>
    new Plant({ id, name, description });
