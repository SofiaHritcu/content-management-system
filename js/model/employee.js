class Employee {
    constructor(id, firstName, lastName, email, birthDate, gender){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.birthDate = birthDate;
        this.gender = gender;
    }

    get id() {
        return this.id;
    }

    get firstName() {
        return this.firstName;
    }

    set firstName (firstName) {
        this.firstName = firstName;
    }

    get lastName() {
        return this.lastName;
    }

    set lastName (lastName) {
        this.lastName = lastName;
    }

    get email() {
        return this.email;
    }

    set email (email) {
        this.email = email;
    }

    get gender() {
        return this.gender;
    }

    set gender (gender) {
        this.gender = gender;
    }

    get birthDate() {
        return this.birthDate;
    }

    set birthDate (birthDate) {
        this.birthDate = birthDate;
    }
}