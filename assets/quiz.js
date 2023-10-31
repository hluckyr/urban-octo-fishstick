//var starting
var welcome = document.querySelector("#introduction");
var startBtn = document.querySelector("#start_button");
var introPage = document.querySelector("#intro_page");

var questionPage = document.querySelector("#question_page");
var askQuestion = document.querySelector("#ask_question");

var reactButtons = document.querySelectorAll(".choices");
var answerBtn1 = document.querySelector("#answer_btn1");
var answerBtn2 = document.querySelector("#answer_btn2");
var answerBtn3 = document.querySelector("#answer_btn3");
var answerBtn4 = document.querySelector("#answer_btn4");

var checkLine = document.querySelector("#check_line");
var scoreBoard = document.querySelector("#submit_page");
var finalScore = document.querySelector("#final_score");
var userInitial = document.querySelector("#initial");

var submitBtn = document.querySelector("#submit_btn");
var highScorePage = document.querySelector("#highscore_page");
var scoreRecord = document.querySelector("#score_record");
var scoreCheck = document.querySelector("#score_check");
var finish = document.querySelector("#finish");

var backBtn = document.querySelector("#back_btn");
var clearBtn = document.querySelector("#clear_btn");

//questions, choices & correct answer
var questionSource = [
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

// countdown & score
var timeLeft = document.getElementById("timer");
var secondsLeft = 60;
var questionNumber = 0;
var totalScore = 0;
var questionCount = 1;

// countdown function
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

//start button
function startQuiz() {
    introPage.style.display = "none";
    questionPage.style.display = "block";
    questionNumber = 0
    countdown();
    showQuestion(questionNumber);

}

//function to show the questions
function showQuestion(n) {
    askQuestion.textContent = questionSource[n].question;
    answerBtn1.textContent = questionSource[n].choices[0];
    answerBtn2.textContent = questionSource[n].choices[1];
    answerBtn3.textContent = questionSource[n].choices[2];
    answerBtn4.textContent = questionSource[n].choices[3];
    questionNumber = n;
}

// check answer
function checkAnswer(event) {
    event.preventDefault();


    checkLine.style.display = "block";
    setTimeout(function () {
        checkLine.style.display = 'none';
    }, 1000);

    // answer check
    if (questionSource[questionNumber].answer == event.target.value) {
        checkLine.textContent = "Correct!";
        totalScore = totalScore + 1;

    } else {
        secondsLeft = secondsLeft - 10;
        checkLine.textContent = "Wrong! The correct answer is " + questionSource[questionNumber].answer + " .";
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
//end game after questions are answered
function gameOver() {

    questionPage.style.display = "none";
    scoreBoard.style.display = "block";
    console.log(scoreBoard);
    //final score
    finalScore.textContent = "Your final score is :" + totalScore;
    timeLeft.style.display = "none";
};

// get score and initials from local storage
function getScore() {
    var currentList = localStorage.getItem("ScoreList");
    if (currentList !== null) {
        freshList = JSON.parse(currentList);
        return freshList;
    } else {
        freshList = [];
    }
    return freshList;
};


// score board , only show top 5 with score
function renderScore() {
    scoreRecord.innerHTML = "";
    scoreRecord.style.display = "block";
    var highScores = sort();
    var topFive = highScores.slice(0, 5);
    for (var i = 0; i < topFive.length; i++) {
        var item = topFive[i];
        var li = document.createElement("li");
        li.textContent = item.user + " - " + item.score;
        li.setAttribute("data-index", i);
        scoreRecord.appendChild(li);
    }
};

// sort score and ranking
function sort() {
    var unsortedList = getScore();
    if (getScore == null) {
        return;
    } else {
        unsortedList.sort(function (a, b) {
            return b.score - a.score;
        })
        return unsortedList;
    }
};

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
    highScorePage.style.display = "block";
    questionPage.style.display = "none";
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