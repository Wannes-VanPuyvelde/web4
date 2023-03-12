export class Plant {
    private id: number;
    private name: String;
    private description: String;

    constructor(name: String, description: String) {
        this.setName(name);
        this.setDescription(description);
    }

    // getters and setters
    getName = () => this.name;

    setName = (name: String) => (this.name = name);

    getDescription = () => this.description;

    setDescription = (description: String) => (this.description = description);

    //equals method
    equals(id, name, description) {
        return this.id === id && this.name === name && this.description === description;
    }

    static create({ name, description }: Plant): Plant {
        return new Plant(name, description);
    }
}
