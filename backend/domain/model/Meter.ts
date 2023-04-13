export class Meter {
    id: number;
    discription: String;
    value: String;

    constructor(discription: String, value: String) {
        this.discription = discription;
        this.value = value;
    }

    static create({ discription, value }: { discription: String; value: String }): Meter {
        return new Meter(discription, value);
    }
}
