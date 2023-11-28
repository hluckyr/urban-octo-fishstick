//variables
var startButton = document.querySelector("#start-button");
var timerEl = document.querySelector("#timer");
var questionEl = document.querySelector("#question");
var answerEl = document.querySelector("#answers");
var scoreEl = document.querySelector("#final-score");
var initialsEl = document.querySelector("#initials");
var submitButton = document.querySelector("#submit-button");
var timeLeft = 60;
var score = 0;
var currentQuestionIndex = 0;
var questions = [
    {
        question: "Commonly used data types do not include:",
        answers: [ "alerts", "booleans", "c. strings", "d. numbers"],
        correctAnswer: "a"
    },
    {
        question: "The condition in an if / else statement is enclosed with _____.",
        answers: ["a. quotes", "b. curly brackets", "c. parenthesis", "d. square brackets"],
        correctAnswer: "c"
    },
    {
        question: "Arrays in JavaScript can be used to store:",
        answers: ["a. numbers and strings", "b. booleans", "c. other arrays", "d. all of the above"],
        correctAnswer: "d"
    },
    {
        question: "String values must be enclosed by _______ when being assigned to a variable:",
        answers: ["a. quotes", "b. commas", "c. curly brackets", "d. parenthesis"],
        correctAnswer: "a"
    },
    {
        question: "A very useful tool during development and debugging for printing content to the debugger is:",
        answers: ["a. JavaScript", "b. terminal/bash", "c. for loops", "d. console.log"],
        correctAnswer: "d"
    }
];

//function to start the quiz
function startQuiz() {
    startButton.style.display = "none";
    var timerInterval = setInterval(function () {
        timeLeft--;
        timerEl.textContent = "Time: " + timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);

    displayQuestion();
}

//function to display a question
function displayQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    answerEl.innerHTML = "";
    for (var i = 0; i < currentQuestion.answers.length; i++) {
        var answerChoice = document.createElement("button");
        answerChoice.textContent = currentQuestion.answers[i];
        answerChoice.setAttribute("class", "answer-choice");
        answerChoice.setAttribute("value", currentQuestion.answers[i]);
        answerChoice.onclick = checkAnswer;
        answerEl.appendChild(answerChoice);
    }
}
// Display final score
function displayFinalScore() {
    questionEl.textContent = "All done!";
    answerEl.innerHTML = "Your final score is " + score + ".";
    initialsEl.style.display = "block";
}

// Call displayFinalScore function
displayFinalScore();

//function to check the answer
function checkAnswer() {
    var selectedAnswer = this.value;
    var currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
        score++;
        scoreEl.textContent = "Score: " + score;
    } else {
        timeLeft -= 10;
        if (timeLeft < 0) {
            timeLeft = 0;
        }
        timerEl.textContent = "Time: " + timeLeft;
    }
    
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
        endQuiz();
    } else {
        displayQuestion();
    }
}

//function to end the quiz
function endQuiz() {
    clearInterval(timerInterval);
    questionEl.textContent = "All done!";
    answerEl.innerHTML = "Your final score is " + score + ".";
    initialsEl.style.display = "block";
}


//start button eventlistener
startButton.addEventListener("click", startQuiz);

//submit button eventlistener
submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    var initials = initialsEl.value.trim();
    if (initials !== "") {
        var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        var newScore = {
            initials: initials,
            score: score
        };
        highScores.push(newScore);
        localStorage.setItem("highScores", JSON.stringify(highScores));
        window.location.href = "highscores.html";
        displayhighScores();
    }
});