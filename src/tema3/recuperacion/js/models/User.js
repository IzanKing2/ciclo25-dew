class User {
    static countId = 0;

    constructor (name, surname, email, password, role_id, direction=null, payMethod=null) {
        this.id = User.countId++;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.role_id = role_id;
        this.direction = direction;
        this.payMethod = payMethod;
    }
}

export default User;