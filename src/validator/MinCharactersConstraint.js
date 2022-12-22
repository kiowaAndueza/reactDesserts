import { Constraint } from "./Constraint";

export class MinCharactersConstraint extends Constraint{
    constructor(name, value, min){
        super(name, value);
        this.min = min;
    }

    getMessage(){
        return `The ${this.name} field must have more than ${this.min} characters`;
    }

    validate(){
        return String(this.value).length > this.min;
    }
    
}