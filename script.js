class ExamSystem {
    constructor(questions) {
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.timeLeft = 60;
        this.timerInterval = null;
        this.init();
    }

    init() {
        document.getElementById('start-btn').addEventListener('click', () => this.startExam());
        document.getElementById('next-btn').addEventListener('click', () => this.nextQuestion());
    }

    startExam() {
        const studentName = document.getElementById('student-name').value;
        if (!studentName) {
            alert("Please enter your name.");
            return;
        }

        document.getElementById('home-page').style.display = 'none';
        document.getElementById('exam-page').style.display = 'block';

        this.shuffleArray(this.questions);
        this.loadQuestion();

        this.timerInterval = setInterval(() => this.updateTimer(), 1000);
    }

    loadQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        document.getElementById('question-title').innerText = question.title;
        document.getElementById('question-image').src = question.image;

        const answersDiv = document.getElementById('answers');
        answersDiv.innerHTML = '';

        this.shuffleArray(question.answers);
        question.answers.forEach(answer => {
            const answerDiv = document.createElement('div');
            answerDiv.className = 'answer';
            answerDiv.innerText = answer;
            answerDiv.addEventListener('click', () => this.selectAnswer(answer, answerDiv));
            answersDiv.appendChild(answerDiv);
        });

        document.getElementById('next-btn').disabled = true;
    }

    selectAnswer(selectedAnswer, answerDiv) {
        const answers = document.querySelectorAll('.answer');
        answers.forEach(answer => answer.classList.remove('selected'));

        answerDiv.classList.add('selected');
        document.getElementById('next-btn').disabled = false;

        const correctAnswer = this.questions[this.currentQuestionIndex].correctAnswer;
        if (selectedAnswer === correctAnswer) {
            this.score++;
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

        if (this.timeLeft <= 0) {
            this.endExam();
        }
    }

    endExam() {
        clearInterval(this.timerInterval);
        document.getElementById('exam-page').style.display = 'none';
        document.getElementById('result-page').style.display = 'block';

        
        const percentage = ((this.score / this.questions.length) * 100).toFixed(2);
        document.getElementById('result-details').innerText = `You have ${this.score} out of ${this.questions.length} correct answers.`;

        this.updateCircularProgressBar(percentage);
    }

    updateCircularProgressBar(percentage) {
        const progressValue = document.querySelector('.progress-value');
        const circularProgress = document.querySelector('.circular-progress');

        let progressStartValue = 0;
        const progressEndValue = percentage;
        const speed = 20;

        const progress = setInterval(() => {
            progressStartValue++;
            progressValue.textContent = `${progressStartValue}%`;
            circularProgress.style.background = `conic-gradient(#4CAF50 ${progressStartValue * 3.6}deg, #e0e0e0 0deg)`;

            if (progressStartValue >= progressEndValue) {
                clearInterval(progress);
            }
        }, speed);
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}

//the questions
const questions = [
    {
        title: "Do you know the breed?",
        image: "image1.jpeg", 
        answers: ["Labrador", "Poodle", "Bulldog", "Beagle"],
        correctAnswer: "Labrador"
    },
    {
        title: "How many cubes are there?",
        image: "image2.png", 
        answers: ["8", "9", "7", "10"],
        correctAnswer: "9"
    },
    {
        title: "Guess the missing dice to complete the set",
        image: "image3.png", 
        answers: ["A", "B", "C", "D"],
        correctAnswer: "D"
    },
    {
        title: "What is the answer?",
        image: "image4.png", 
        answers: ["15", "10", "3", "22"],
        correctAnswer: "3"
    },
    {
        title: "Which one is the top view of the pyramid?",
        image: "image5.png", 
        answers: ["A", "B", "C", "D"],
        correctAnswer: "C"
    },
    {
        title: "What is the answer?",
        image: "image6.png", 
        answers: ["5", "0", "4", "2"],
        correctAnswer: "0"
    },
    {
        title: "Guess the number",
        image: "image7.png", 
        answers: ["30", "35", "41", "34"],
        correctAnswer: "34"
    },
    {
        title: "Can you translate this into words?",
        image: "image8.png", 
        answers: ["Can you be ready at 5", "Can you be swim @ time", "Drink honey at coffie", "N/A"],
        correctAnswer: "Can you be ready at 5"
    },
    {
        title: "Can you guess the word?",
        image: "image9.png", 
        answers: ["Precious", "Personality", "Parents", "N/A"],
        correctAnswer: "Personality"
    },
    {
        title: "Which of the following is 'Two Zero Two Six'?",
        image: "image10.png", 
        answers: ["A", "B", "C", "D"],
        correctAnswer: "C"
    },
];


const examSystem = new ExamSystem(questions);
