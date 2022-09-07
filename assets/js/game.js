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

function introFunction() {
    if (j > 0) {
        j = 0;
        smallMainContainer.appendChild(multiButtonElement);
    }
    bigMainContainer.textContent = "Welcome to the JavaScript Quiz!";
    smallMainContainer.textContent = "Complete all questions before the timer runs out! Wrong answers take 15 seconds off the timer. Try to complete the quiz with the most time remaining!";
    multiButtonElement.textContent= multiButtonElement.getAttribute("data-start")
}

multiButtonElement.addEventListener("click", startGame);


function timerFunction() {
    time = setInterval(function (){
        timerELement.textContent = currentTime
        currentTime--;
        if (currentTime < 0) {
            currentTime = 0
            clearInterval(time);
            endGame();
        }
        if (currentTime === 0) {
            clearInterval(time);
            console.log("Time up")
            endGame();
        }
    },1000);
};

function renderQuestions() {
    console.log(j);
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
    console.log(answerArray)
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

function answerQuestions () {
    smallMainContainer.addEventListener("click", function (event) {
        event.stopImmediatePropagation();
        console.log(event)
        var yourGuess = event.target
        var yourGuessAttribute = yourGuess.getAttribute("data-correct");
        console.log(yourGuess.getAttribute("data-correct"))
        if (yourGuess !== "section") {
            answerQuestions();
        } 
        if (yourGuessAttribute === "correct") {
            console.log("You are correct");
            j++;
            if (j === 5) {
                    endGame();
            } else {
            renderQuestions();   
            }      
        } else {
            console.log("Wrong answer!");
            currentTime = currentTime - 15;
            j++;
            if (j === 5) {
                endGame();
            } else {
            renderQuestions();   
            }  
        }
    })
}

function endGame() {
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
        bigMainContainer.textContent = "Better luck next time!"
        smallMainContainer.textContent = ""
    }
}

function startGame () {
    timerFunction ();
    renderQuestions();
    answerQuestions();
}

// Quiz init
    // Timer
    // Questions
        // will be objects
        // can't be repeated
    // Progession (click)
    // Win/Lose

// Show Final Score
    // Allow initials entry

// Store score as objects in a local storage array

// Display highscores
    //Display local storage items
        // must sort array by score
    // Allow to play again
