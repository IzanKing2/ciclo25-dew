class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    static demoUsers() {
        return [
            new User('Admin', 'admin123'),
            new User('Izan', 'user123')
        ];
    }
}