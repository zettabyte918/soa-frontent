export class Author {
    id: number;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
    tel: string;
    datenai: Date;

    constructor(
        id: number,
        username: string,
        password: string,
        firstname: string,
        lastname: string,
        email: string,
        tel: string,
        datenai: Date
    ) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.tel = tel;
        this.datenai = datenai;
    }
}
