import { Constraint } from "./Constraint";

export class MinRangeConstraint extends Constraint {
    constructor(name, value, min){
        super(name, value);
        this.min = min;
    }

    getMessage(){
        console.log("hola"+this.value);
        return `The ${this.name} field must be greater than ${this.min}`;
    }

    validate(){
        return this.value > this.min;
    }


}
