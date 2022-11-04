$("#startButton").on('click', startQuiz)
var timerEl = $("#countdown")

function startQuiz() {
    //start Timer
    countdown()


    //question 1 is presented 
}

function countdown() {
    var timeLeft = 60;
    var timeInterval = setInterval(function () {
        if (timeLeft > 1) {
            timerEl.text(timeLeft + ' seconds remaining');
            timeLeft--;
        } else if (timeLeft === 1) {
            timerEl.text(timeLeft + ' second remaining');
            timeLeft--;
        } else {
            timerEl.text('TIMES UP')
            clearInterval(timeInterval);
        }
    }, 100);
}


