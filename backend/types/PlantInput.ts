import { LightBasicInput } from './LightInput';

export interface PlantBasicInput {
    id: number;
    name: string;
    description: string;
    locationId?: number; // added
}

export interface PlantInput extends PlantBasicInput {
    lights: LightBasicInput[];
    locationId?: number;
}
