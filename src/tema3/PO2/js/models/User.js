export class User {
    static count = 0;

    constructor(username, password, role) {
        this.id = User.count++;
        this.username = username;
        this.password = password;
        this.role = role;
    }
}