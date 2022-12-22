
export class Validator {
    constructor(object) {
        this.constraints = [];
        this.errors = [];
        this.setConstraints(object);
        console.log(this.constraints);
    }

    test(){
        this.constraints.forEach(constraint => {
            this.errors.push(constraint.test());
        });
        return this.errors;
    }


    setConstraints(object){
        Object.values(object).forEach(item => {
            item.constraints.forEach(constraint => {
                this.constraints.push(constraint);
            })
        });
    }

}

