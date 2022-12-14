//only home page will show until start button is selected
$("main").children().hide()
$("#homescreen").show()
//event handlers for all buttons: start, submit, clear high score, go home
$("#startButton").on('click', startQuiz)
$("#submit").on("click", submitHighScore)
$("#clearHighScores").on("click", clearHighScores)
$("#goHome").on("click", goHome)
$("#highscore").on("click", showHS)
//global variables to handle game logic
var timerEl = $("#countdown")
var timeLeft = 60;
var timeInterval = null
//global objects to handle game scoring 
var highScores = []
var score = 0
loadHighScores()
//first function to run once Start button is clicked 
function startQuiz() {
    //the homescreen is hidden  
    $("main").children().hide()
    //question is presented and the timer is visible
    $("#questions").show()
    $("#countdown").show()
    //start score back at 0
    score = 0
    //start Timer
    countdown()
    //array of objects containing information pertaining to each
    //question and its correct answer and incorrect answer
    var questionsList = [
        {
            question: "What is an array?",
            answer: ["objects stored in a list type structure", "data items of the same type collected at contiguous memory locations", "data items of the same type collected at contiguous memory locations", "all of the above"],
            correctAnswer: "all of the above"
        },
        {
            question: "Where should a variable be stored in order to be used in a function without being passed in a parameter?",
            answer: ["globally", "in the scope", "in the function", "you don't have to store it as a variable"],
            correctAnswer: "globally"
        },
        {
            question: "what do we call a function that responds to an event?",
            answer: ["target", "event listener", "event handler", "null"],
            correctAnswer: "event handler"
        },
        {
            question: "what does HTML stand for?",
            answer: ["Hyper Text Markup Linguini", "Hyper Text Markup Language", "Had To Make Lasagna", "Hyper Text Makeup Language"],
            correctAnswer: "Hyper Text Markup Language"
        },
        {
            question: "What method is used to convert objects in such a way before they are allowed to be saved to local storage?",
            answer: [".stringify()", ".localStorage()", ".spaghetti", ".storeLocally()"],
            correctAnswer: ".stringify()"
        }
    ]
    //variable that holds total num of questions
    var total = questionsList.length
    var i = 0
    $("#correct").hide();
    $("#false").hide();
    //question 1 is presented along with its answers
    //removing the last question object from the questionList 
    //and returning that question object to the var currentQuestion
    let currentQuestion = questionsList.pop()
    //targeting and injecting question number into question number component in index
    $(".card-title").text(`Question ${i + 1} / ${total}`)
    //targeting and injecting question into question component in index
    $(".card-text").text(currentQuestion.question)
    //targeting and injecting answers into each answer component in index
    $("#A").text(currentQuestion.answer[0])
    $("#B").text(currentQuestion.answer[1])
    $("#C").text(currentQuestion.answer[2])
    $("#D").text(currentQuestion.answer[3])
    //event listener on answer choices using delegation to determine what 
    //answer choice was clicked but running same event handler for each one 
    $("#answerChoices").on("click", function (event) {
        //increment question number by 1 with every click
        i++
        //checking for correct answer by comparing choice clicked to 
        //correct answer in currentQuestion object
        if ($(event.target).text() === currentQuestion.correctAnswer) {
            //"CORRECT!" alert sent if choice clicked matches correct 
            //answer in currentQuestion object
            $("#correct").show();
            //add 20 points to score for every correct answer
            score += 20
        } else {
            //"FALSE!" alert sent if choice clicked DOES NOT match 
            //correct answer in currentQuestion object
            $("#false").show();
            //deduct 5 seconds for every wrong answer
            timeLeft -= 5
        }
        //if there are no more questions then run end game function
        if (questionsList.length === 0) {
            gameOver()
        } else {
            //otherwise present next question 
            setTimeout(function () {
                $("#correct").hide();
                $("#false").hide();
                currentQuestion = questionsList.pop()
                $(".card-title").text(`Question ${i + 1} / ${total}`)
                $(".card-text").text(currentQuestion.question)
                $("#A").text(currentQuestion.answer[0])
                $("#B").text(currentQuestion.answer[1])
                $("#C").text(currentQuestion.answer[2])
                $("#D").text(currentQuestion.answer[3])
            }, 500)
        }
    })

}
//timer function counts down by 1 from 60 seconds
function countdown() {
    //timer starts at 60 seconds
    timeLeft = 60
    timerEl.text(timeLeft + ' seconds remaining');
    //count down by 1 second
    timeLeft--
    //count down by 1 every second
    timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timerEl.text(timeLeft + ' seconds remaining');
            timeLeft--;
        } else if (timeLeft === 1) {
            timerEl.text(timeLeft + ' second remaining');
            timeLeft--;
        } else {
            //if time runs out run end game function
            timerEl.text('TIMES UP')
            gameOver()
        }
    }, 1000);
}

//this function runs once the timer has run out of time
function gameOver() {
    //Remove click handler
    $('#answerChoices').off("click")
    //Stop the clock when game is over
    clearInterval(timeInterval)
    //Present ALL DONE component containing score
    $("main").children().hide()
    $("#initials").show();
    $("#score").text('Your final score is:' + score);
    //user input is asked for at the bottom of this 
    //component then submitHighScore function runs
}

function loadHighScores() {
    $("tbody").children().remove();
    //Get array of objects containing highscores
    highScores = JSON.parse(localStorage.getItem("player"));
    //If there are no highscores
    if (highScores === null) {
        highScores = [] //just set highscores to an empty array
    } else { //otherwise, if there are highscores, 
        //For each high score object in the array called highScore: 
        for (var i = 0; i < highScores.length; i++) {
            //inject a row into table body
            $("tbody").append(
                "<tr><th>" + i + "</th><td>" + highScores[i].name.toUpperCase() + "</td><td>" + highScores[i].score + "</td></tr>"
            )
        }
    }
}

//If user enters initials and clicks submit 
function submitHighScore() {
    //get user input from text input field
    var name = $("#input").val()
    //create object to store user initials and score
    var highScore = {
        name: name,
        score: score
    }
    //push high score objects into global array of high scores
    highScores.push(highScore);
    //convert array of high score objects into string first then save in local storage
    localStorage.setItem("player", JSON.stringify(highScores))
    $("#initials").hide();
    $("#chart").show();
    loadHighScores();
}

function clearHighScores() {
    //empty out local storage
    localStorage.clear()
    //remove all rows from table body
    $("tbody").children().remove()
    //highScores array is set to empty
    highScores = []
}

function goHome() {
    $("main").children().hide()
    $("#homescreen").show()
}

function showHS() {
    $("main").children().hide()
    $("#chart").show()
}