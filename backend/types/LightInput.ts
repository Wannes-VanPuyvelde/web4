import { PlantBasicInput } from './PlantInput';

export interface LightBasicInput {
    id: number;
    name: string;
    light_on: boolean;
    light_color: string;
}
export interface LightInput extends LightBasicInput {
    plants: PlantBasicInput[];
}
