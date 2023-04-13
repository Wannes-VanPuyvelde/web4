export class Water {
    id: number;
    name: String;
    frequency: String;
    quantity: number;

    constructor(name: String, frequency: String, quantity: number) {
        this.name = name;
        this.frequency = frequency;
        this.quantity = quantity;
    }

    static create({ name, frequency, quantity }: { name: String; frequency: String, quantity:number }): Water {
        return new Water(name, frequency, quantity);
    }
}
