export class Plant {
    id: number;
    name: String;
    description: String;

    constructor(name: String, description: String) {
        this.name = name;
        this.description = description;
    }

    static create({ name, description }: { name: String; description: String }): Plant {
        return new Plant(name, description);
    }
}
