const introPage = document.querySelector('#intro-page');
const highscoresBtn = document.querySelector("#highscores");
const timerEl = document.querySelector("#timer");
const startPageEl = document.querySelector("#start-page");
const startBtn = document.querySelector("#start-button");
const questionPageEl = document.querySelector("#question-page");
const quizQuestionEl = document.querySelector("#quiz-question");
const answerBtn1 = document.querySelector("#answer-btn1");
const answerBtn2 = document.querySelector("#answer-btn2");
const answerBtn3 = document.querySelector("#answer-btn3");
const answerBtn4 = document.querySelector("#answer-btn4");
const checkLineEl = document.querySelector("#check-line");
const submitPageEl = document.querySelector("#submit-page");
const completeEl = document.querySelector("#complete");
const finalScoreEl = document.querySelector("#final-score");
const initialEl = document.querySelector("#initial");
const submitBtn = document.querySelector("#submit-btn");
const highscorePageEl = document.querySelector("#highscore-page");
const scoreRecordEl = document.querySelector("#score-record");
const backBtn = document.querySelector("#back-btn");
const clearBtn = document.querySelector("#clear-btn");
const questionSource = [
    {
        question: "Commonly used data types do not include:",
        choices: ["a. alerts", "booleans", "c. strings", "d. numbers"],
        answer: "a"
    },
    {
        question: "The condition in an if / else statement is enclosed with _____.",
        choices: ["a. quotes", "b. curly brackets", "c. parenthesis", "d. square brackets"],
        answer: "c"
    },
    {
        question: "Arrays in JavaScript can be used to store:",
        choices: ["a. numbers and strings", "b. booleans", "c. other arrays", "d. all of the above"],
        answer: "d"
    },
    {
        question: "String values must be enclosed by _______ when being assigned to a variable:",
        choices: ["a. quotes", "b. commas", "c. curly brackets", "d. parenthesis"],
        answer: "a"
    },
    {
        question: "A very useful tool during development and debugging for printing content to the debugger is:",
        choices: ["a. JavaScript", "b. terminal/bash", "c. for loops", "d. console.log"],
        answer: "d"
    }
];

var timeLeft = document.getElementById("timer");
var secondsLeft = 60;
var questionNumber = 0;
var totalScore = 0;
var questionCount = 1;

//star function
function startQuiz() {
    startPageEl.style.display = "none";
    questionPageEl.style.display = "block";
    questionNumber = 0
    countdown();
    displayQuestion(questionNumber);
}

//countdown function
function countdown() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeLeft.textContent = "Time left: " + secondsLeft + " s";

        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            timeLeft.textContent = "Time is up!";
            finish.textContent = "Time is up!";
            gameOver();
        } else if (questionCount >= questionSource.length + 1) {
            clearInterval(timerInterval);
            gameOver();
        }
    }, 1000);
}

//show questions
function displayQuestion(questionNumber) {
    quizQuestionEl.textContent = questionSource[questionNumber].question;
    answerBtn1.textContent = questionSource[questionNumber].choices[0];
    answerBtn2.textContent = questionSource[questionNumber].choices[1];
    answerBtn3.textContent = questionSource[questionNumber].choices[2];
    answerBtn4.textContent = questionSource[questionNumber].choices[3];
}

// checking answer function
function checkAnswer(selectedAnswer, event) {
    event.preventDefault();

    checkLineEl.style.display = "block";
    setTimeout(function () {
        checkLineEl.style.display = 'none';
    }, 1000);
    // answer check
    if (questionSource[questionNumber].answer == selectedAnswer) {
        checkLineEl.textContent = "Correct!";
        totalScore = totalScore + 1;

    } else {
        secondsLeft = secondsLeft - 10;
        checkLineEl.textContent = "Wrong! The correct answer is " + questionSource[questionNumber].answer + " .";
    }
    //next question
    if (questionNumber < questionSource.length - 1) {
        // call showQuestions to bring in next question when any reactBtn is clicked
        showQuestion(questionNumber + 1);
    } else {
        gameOver();
    }
    questionCount++;
}

//function for end of quiz
function gameOver() {
    questionPageEl.style.display = "none";
    scoreBoard.style.display = "block";
    finalScoreEl.textContent = "Your final score is: " + totalScore;
    timeLeft.style.display = "none";

    // Save the score to local storage
    var initials = initialEl.value.trim();
    if (initials !== "") {
        var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
        var newScore = {
            initials: initials,
            score: totalScore
        };
        highscores.push(newScore);
        localStorage.setItem("highscores", JSON.stringify(highscores));
    }
}

// show top five highscores function
function showTopFive() {
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    highscores.sort(function(a, b) {
        return b.score - a.score;
    });
    var topFive = highscores.slice(0, 5);
    var scoreList = document.createElement("ol");
    for (var i = 0; i < topFive.length; i++) {
        var scoreItem = document.createElement("li");
        scoreItem.textContent = topFive[i].initials + " - " + topFive[i].score;
        scoreList.appendChild(scoreItem);
    }
    scoreRecordEl.appendChild(scoreList);
}

// local storage feature for the scores
function addItem(n) {
    var addedList = getScore();
    addedList.push(n);
    localStorage.setItem("ScoreList", JSON.stringify(addedList));
};

function saveScore() {
    var scoreItem = {
        user: userInitial.value,
        score: totalScore
    }
    addItem(scoreItem);
    renderScore();
}

// event listener to start quiz 
startBtn.addEventListener("click", startQuiz);

//select answer, check answer, go to next question
reactButtons.forEach(function (click) {
    click.addEventListener("click", checkAnswer);
});

//save info and go to next page
submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "none";
    highscorePageEl.style.display = "block";
    questionPageEl.style.display = "none";
    saveScore();
});

// check high score ranking list
scoreCheck.addEventListener("click", function (event) {
    event.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "none";
    highScorePage.style.display = "block";
    questionPage.style.display = "none";
    renderScore();
});

//back to main page
backBtn.addEventListener("click", function (event) {
    event.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "block";
    highScorePage.style.display = "none";
    questionPage.style.display = "none";
    location.reload();
});

//clear local storage and clear page shows
clearBtn.addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.clear();
    renderScore();
});