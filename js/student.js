export class Student{
    constructor(name){
        this.name=name;
        this.score=0
    }
    incrementScore(){
        this.score++;
    }
    getScore() {
        return this.score;
    }

    getName() {
        return this.name;
    }
}