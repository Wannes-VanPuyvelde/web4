export class User {
    id: number;
    username: string;
    email: string;
    password: string;

    constructor(username: string, email: string, password: string) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
    
    static create({ username, email, password }: User): User {
        return new User(username, email, password);
    }
}
