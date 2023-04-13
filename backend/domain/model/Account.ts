class Account {
    id: number;
    username: string;
    email: string;
    password: string;

    constructor(username: string, email: string, password: string) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
    
    static create({ username, email, password }: Account): Account {
        return new Account(username, email, password);
    }
}
