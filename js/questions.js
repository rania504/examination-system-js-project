export class Question{
    constructor(title,image,answer,correctAnswer){
        this.title=title;
        this.image=image;
        this.answers=answer;
        this.correctAnswer=correctAnswer;
    }
    isCorrectAnswer(answer){
        return answer===this.correctAnswer
    }
}
export const questions = [
    new Question("Do you know the breed?", "image1.jpeg", ["Labrador", "Poodle", "Bulldog", "Beagle"], "Labrador"),
    new Question("How many cubes are there?", "image2.png", ["8", "9", "7", "10"], "9"),
    new Question("Guess the missing dice to complete the set", "image3.png", ["A", "B", "C", "D"], "D"),
    new Question("What is the answer?", "image4.png", ["15", "10", "3", "22"], "3"),
    new Question("Which one is the top view of the pyramid?", "image5.png", ["A", "B", "C", "D"], "C"),
    new Question("What is the answer?", "image6.png", ["5", "0", "4", "2"], "0"),
    new Question("Guess the number", "image7.png", ["30", "35", "41", "34"], "34"),
    new Question("Can you translate this into words?", "image8.png", ["Can you be ready at 5", "Can you be swim @ time", "Drink honey at coffee", "N/A"], "Can you be ready at 5"),
    new Question("Can you guess the word?", "image9.png", ["Precious", "Personality", "Parents", "N/A"], "Personality"),
    new Question("Which of the following is 'Two Zero Two Six'?", "image10.png", ["A", "B", "C", "D"], "C")
];