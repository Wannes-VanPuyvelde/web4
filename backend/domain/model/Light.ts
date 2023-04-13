export class Light {
    id: number;
    name: String;
    time_on: number;
    light_color: String;

    constructor(name: String, time_on: number, light_color: String) {
        this.name = name;
        this.time_on = time_on;
        this.light_color = light_color;
    }

    static create({ name, time_on, light_color }: { name: String; time_on: number, light_color: String }): Light {
        return new Light(name, time_on, light_color);
    }
}