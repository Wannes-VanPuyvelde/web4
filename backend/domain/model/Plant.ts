export class Plant {
    id: number;
    name: String;
    description: String;

    constructor(name: String, description: String) {
        this.name = name;
        this.description = description;
    }

    // getters and setters
    // getId = () => this.id;

    // setId = (id: number) => (this.id = id);

    // getName = () => this.name;

    // setName = (name: String) => (this.name = name);

    // getDescription = () => this.description;

    // setDescription = (description: String) => (this.description = description);

    //equals method
    // equals(id, name, description) {
    //     return this.id === id && this.name === name && this.description === description;
    // }

    static create({ name, description }: { name: String; description: String }): Plant {
        return new Plant(name, description);
    }
}
