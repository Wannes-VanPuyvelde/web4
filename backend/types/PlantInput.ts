import { LightBasicInput } from './LightInput';

export interface PlantBasicInput {
    id: number;
    name: string;
    description: string;
}
export interface PlantInput extends PlantBasicInput {
    lights: LightBasicInput[];
}