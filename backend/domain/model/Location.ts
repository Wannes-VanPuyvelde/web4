export class Location {
    id: number;
    name: String;
    description: String;
    street: String;
    number: number;
    town: String;

    constructor(name: String, description: String, street: String, number: number, town: String) {
        this.name = name;
        this.description = description;
        this.street = street;
        this.number = number;
        this.town = town;
    }

    static create({ name, description, street, number, town }: { name: String; description: String, street: String, number: number, town: String }): Location {
        return new Location(name, description, street, number, town);
    }
}
