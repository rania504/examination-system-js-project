import { Student } from "./student.js";
export class ExamSystem{
    constructor(questions){
        this.questions=questions;
        this.currentQuestionIndex=0;
        this.student=null;
        this.timerInterval = null;
        this.timeLeft = 60;
        this.init();
    }
    init() {
        document.getElementById('start-btn').addEventListener('click', () => this.startExam());
        document.getElementById('next-btn').addEventListener('click', () => this.nextQuestion());
    }
    startExam(){
        const name = document.getElementById('student-name').value.trim();
        if (!name) {
            alert("Please enter your name!");
            return;
        }
        this.student = new Student(name); 
        this.currentQuestionIndex = 0;

        document.getElementById('home-page').style.display = 'none';
        document.getElementById('exam-page').style.display = 'block';

        this.shuffleArray(this.questions);
        this.loadQuestion();

        this.timerInterval = setInterval(() => this.updateTimer(), 1000);
    }
    loadQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        document.getElementById('question-number').innerText = `Question ${this.currentQuestionIndex + 1} of ${this.questions.length}`;
        document.getElementById('question-title').innerText = question.title;
        document.getElementById('question-image').src = question.image;
        const answersDiv = document.getElementById('answers');
        answersDiv.innerHTML = '';

        this.shuffleArray(question.answers);
        question.answers.forEach(answer => {
            const answerDiv = document.createElement('div');
            answerDiv.className = 'answer';
            answerDiv.innerText = answer;
            answerDiv.addEventListener('click', () => this.selectAnswer(answer, answerDiv, question));
            answersDiv.appendChild(answerDiv);
        });
        document.getElementById('next-btn').disabled = true;
    }
    selectAnswer(selectedAnswer, answerDiv, question) {
        document.querySelectorAll('.answer').forEach(el => el.classList.remove('selected'));
        answerDiv.classList.add('selected');
        document.getElementById('next-btn').disabled = false;

        if (question.isCorrectAnswer(selectedAnswer)) {
            this.student.incrementScore();
        }
    }
    nextQuestion() {
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex < this.questions.length) {
            this.loadQuestion();
        } else {
            this.endExam();
        }
    }
    updateTimer() {
        this.timeLeft--;
        document.getElementById('time-left').textContent = this.timeLeft;
        if (this.timeLeft <= 0) this.endExam();
    }
    endExam() {
        clearInterval(this.timerInterval);
        document.getElementById('exam-page').style.display = 'none';
        document.getElementById('result-page').style.display = 'block';

        const percentage = ((this.student.score / this.questions.length) * 100).toFixed(2);
        document.getElementById('result-details').innerText =
            `${this.student.name}, you got ${this.student.score} out of ${this.questions.length} correct.`;

        this.updateCircularProgressBar(percentage);
    }
    updateCircularProgressBar(percentage) {
        const progressValue = document.querySelector('.progress-value');
        const circularProgress = document.querySelector('.circular-progress');
        let progressStartValue = 0;
        const progressEndValue = Math.floor(percentage);
        const speed = 20;

        if (progressEndValue === 0) {
            progressValue.textContent = "0%";
            circularProgress.style.background = `conic-gradient(#e0e0e0 0deg, #e0e0e0 360deg)`;
            return;
        }

        const progress = setInterval(() => {
            progressStartValue++;
            progressValue.textContent = `${progressStartValue}%`;
            circularProgress.style.background = `conic-gradient(#4CAF50 ${progressStartValue * 3.6}deg, #e0e0e0 0deg)`;

            if (progressStartValue >= progressEndValue) clearInterval(progress);
        }, speed);
    }
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}