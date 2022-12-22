import { Constraint } from "./Constraint";

export class MaxCharactersConstraint extends Constraint{
    constructor(name, value, max){
        super(name, value);
        this.max = max;
    }

    getMessage(){
        return `The ${this.name} field must have less than ${this.max} characters`;
    }

    validate(){
        return String(this.value).length < this.max;
    }
    
}