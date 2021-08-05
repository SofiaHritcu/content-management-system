class Employee {
    constructor(id, firstName, lastName, email, birthDate, gender){
        this.idEmployee = id;
        this.firstNameEmployee = firstName;
        this.lastNameEmployee = lastName;
        this.emailEmployee = email;
        this.birthDateEmployee = birthDate;
        this.genderEmployee = gender;
    }

    get id() {
        return this.idEmployee;
    }

    set id( id ) {
        this.idEmployee = id;
    }

    get firstName() {
        return this.firstNameEmployee;
    }

    set firstName (firstName) {
        this.firstNameEmployee = firstName;
    }

    get lastName() {
        return this.lastNameEmployee;
    }

    set lastName (lastName) {
        this.lastNameEmployee = lastName;
    }

    get email() {
        return this.emailEmployee;
    }

    set email (email) {
        this.emailEmployee = email;
    }

    get gender() {
        return this.genderEmployee;
    }

    set gender (gender) {
        this.genderEmployee = gender;
    }

    get birthDate() {
        return this.birthDateEmployee;
    }

    set birthDate (birthDate) {
        this.birthDateEmployee = birthDate;
    }
}