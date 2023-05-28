export class Plant {
    id: number;
    name: String;
    description: String;
    locationId?: number;

    constructor(name: String, description: String, locationId?: number) {
        this.name = name;
        this.description = description;
        this.locationId = locationId;
    }

    static create({ name, description, locationId }: { name: String; description: String, locationId?: number }): Plant {
        return new Plant(name, description, locationId);
    }
}

export type PlantLight = {
    plantId: number;
    lightId: number;
};
