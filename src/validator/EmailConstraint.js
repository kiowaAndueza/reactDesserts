import { Constraint } from "./Constraint";

export class EmailConstraint extends Constraint {
    getMessage(){
        return `The ${this.name} field cannot be '${this.value}' because is not valid`;
    }


    validate(){
        const regexEmail = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        return regexEmail.test(this.value);
    }
}
