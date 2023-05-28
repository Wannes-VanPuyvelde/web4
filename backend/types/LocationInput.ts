import { PlantBasicInput } from "./PlantInput";

export interface LocationBasicInput {
    id: number;
    name: string;
    description: string;
    street: string;
    number: number;
    town: string;
    
}

export interface LocationInput extends LocationBasicInput{
    plants: PlantBasicInput[];
}
