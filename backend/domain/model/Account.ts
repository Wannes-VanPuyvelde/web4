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

    // getters and setters
    getId = () => this.id;
    setId = (id: number) => (this.id = id);

    getUsername = () => this.username;
    setUsername = (username: string) => (this.username = username);

    getEmail = () => this.email;
    setEmail = (email: string) => (this.email = email);

    getPassword = () => this.password;
    setPassword = (password: string) => (this.password = password);

    static create({ username, email, password }: Account): Account {
        return new Account(username, email, password);
    }
}
