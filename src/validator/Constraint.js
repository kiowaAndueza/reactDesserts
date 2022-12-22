export class Constraint {
    constructor(name, value){
        this.name = name;
        this.value = value;
    }

    test(){
        return this.validate() ? "" : this.getMessage();
    }
}