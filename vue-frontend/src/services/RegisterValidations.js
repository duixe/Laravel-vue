import Validations from './Validations';

export default class RegisterValidations{
    constructor(name, email, password, password_confirmation) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.password_confirmation = password_confirmation;
    }

    checkValidations() {
        let errors = [];

        //email validations
        if (!Validations.checkEmail(this.email)) {
            errors['email'] = 'Invalid Email';
        }

        //password Validations
        if (!Validations.minLength(this.password, 6)) {
            errors['password'] = 'password should be at least 6 characters';
        }

        //password Validations
        if (!Validations.minLength(this.password_confirmation, 6)) {
            errors['password_confirmation'] = 'password should be at least 6 characters';
        }

        // password confirmation 
        if(this.password_confirmation !== this.password) {
            errors['password_confirmation'] = 'password does not match';
        }

        return errors;
    }

}