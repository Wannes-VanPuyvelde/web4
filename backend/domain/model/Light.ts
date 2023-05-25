export class Light {
    id: number;
    name: string;
    light_on: boolean;
    light_color: string;

    constructor(name: string, light_on: boolean, light_color: string) {
        this.name = name;
        this.light_on = light_on;
        this.light_color = light_color;
    }

    static create({ name, light_on, light_color }: { name: string; light_on: boolean, light_color: string }): Light {
        return new Light(name, light_on, light_color);
    }
}

export type LightPlant = {
    lightId: number;
    plantId: number;
};