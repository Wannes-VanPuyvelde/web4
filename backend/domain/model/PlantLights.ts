import { Plant } from "./Plant";
import { Light } from "./Light";

export class PlantLights {
    plant: Plant
    light: Light

    constructor(plant: Plant, light:Light) {
        this.plant = plant
        this.light = light
    }
}