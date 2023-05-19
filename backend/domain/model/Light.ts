export class Light {
    id: number;
    name: string;
    time_on: number;
    light_color: string;

    constructor(name: string, time_on: number, light_color: string) {
        this.name = name;
        this.time_on = time_on;
        this.light_color = light_color;
    }

    static create({ name, time_on, light_color }: { name: string; time_on: number, light_color: string }): Light {
        return new Light(name, time_on, light_color);
    }
}