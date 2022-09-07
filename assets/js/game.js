var mainSectionContainer = document.getElementById("main-section");
var bigMainContainer = document.getElementById("big-main");
var smallMainContainer = document.getElementById("small-main");
var multiButtonElement = document.getElementById("multi-button")
var timerELement = document.getElementById("timer")
var currentTime = 60;
var correctAnswer
var j = 0
var score
// Greeting init

introFunction();

// Sets up the page on first load and after the quiz is complete
function introFunction() {
    if (j > 0) {
        j = 0;
        multiButtonElement = document.createElement("button");
        multiButtonElement.textContent = multiButtonElement.getAttribute("data-start");
        mainSectionContainer.appendChild(multiButtonElement);
        multiButtonElement.addEventListener("click", startGame)
    }
    currentTime = 60;
    timerELement.textContent = currentTime;
    bigMainContainer.textContent = "Welcome to the JavaScript Quiz!";
    smallMainContainer.textContent = "Complete all questions before the timer runs out! Wrong answers take 15 seconds off the timer. Try to complete the quiz with the most time remaining!";
    multiButtonElement.textContent= multiButtonElement.getAttribute("data-start")
}

// Clicking the start button will begin the game
multiButtonElement.addEventListener("click", startGame);

// This keeps track of time 
function timerFunction() {
    time = setInterval(function (){
        timerELement.textContent = currentTime
        currentTime--;
        if (currentTime < 0) {
            currentTime = 0
            timerELement.textContent = currentTime;
            clearInterval(time);
            endGame();
        }
        if (currentTime === 0) {
            clearInterval(time);
            endGame();
        }
    },1000);
};

// This function handles locating question properties and displaying them on the screen
function renderQuestions() {
    if (j === 0){
        mainSectionContainer.removeChild(multiButtonElement);
    }

    bigMainContainer.textContent = questions[j].question
    smallMainContainer.textContent = "";

    correctAnswer = questions[j].correctAnswer;
    var answerOne = questions[j].firstAnswer;
    var answerTwo = questions[j].secondAnswer;
    var answerThree = questions[j].thirdAnswer;
    var answerFour = questions[j].fourthAnswer;

    var box0 = document.createElement("section");
    var box1 = document.createElement("section");
    var box2 = document.createElement("section");
    var box3 = document.createElement("section");

    var answerArray = [box0,box1,box2,box3]
    for (let i = 0; i < answerArray.length; i++) {
        if (correctAnswer == i){
            answerArray[i].setAttribute("data-correct", "correct");
        }
    }

    box0.textContent = answerOne;
    box1.textContent = answerTwo;
    box2.textContent = answerThree;
    box3.textContent = answerFour;

    smallMainContainer.appendChild(box0);
    smallMainContainer.appendChild(box1);
    smallMainContainer.appendChild(box2);
    smallMainContainer.appendChild(box3);

}

// This begins the porcess handling an answer click
function answerQuestions () {
    smallMainContainer.addEventListener("click", handleAnswer)
}

// This is the bulk of the answer click handling process
function handleAnswer (event) {
    event.stopImmediatePropagation();
    var yourGuess = event.target
    var yourGuessAttribute = yourGuess.getAttribute("data-correct");
    if (yourGuess !== "section") {
        answerQuestions();
    } 
    if (yourGuessAttribute === "correct") {
        j++;
        if (j === 5) {
                endGame();
        } else {
        renderQuestions();   
        }      
    } else {
        currentTime = currentTime - 15;
        j++;
        if (j === 5) {
            endGame();
        } else {
        renderQuestions();   
        }  
    }
}

// This ends the game and allows you to enter your initials
function endGame() {
    smallMainContainer.removeEventListener("click", handleAnswer);
    if (currentTime > 0) {
        clearInterval(time);
        score = currentTime
        bigMainContainer.textContent = "Congratulations! Your scored " + score + " !";
        smallMainContainer.textContent = "Enter your initials!"
        var initialsInput = document.createElement("input");
        var submitButton = document.createElement("button");
        smallMainContainer.appendChild(initialsInput);
        smallMainContainer.appendChild(submitButton);
        submitButton.textContent = multiButtonElement.getAttribute("data-submit");
        submitButton.addEventListener("click", function (){
            currentTime = 60;
            timerELement.textContent = currentTime;
            var initials = initialsInput.value
            var highscores = {
                initials: initials,
                score: score,
            }
            localStorage.setItem("highscore", JSON.stringify(highscores));
            introFunction();
        })
    }
    if (currentTime === 0) {
        currentTime = 0;
        timerELement.textContent = currentTime;
        bigMainContainer.textContent = "Better luck next time!";
        smallMainContainer.textContent = "";
        var playAgainButton = document.createElement("button")
        playAgainButton.textContent = "Play Again!"
        smallMainContainer.appendChild(playAgainButton);
        playAgainButton.addEventListener("click", introFunction)
    }
}

// This is the flow of the quiz
function startGame () {
    timerFunction ();
    renderQuestions();
    answerQuestions();
}
