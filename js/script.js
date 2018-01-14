var time = 0,   // track of time remaining
    score = 0,  // score count
    userChoice, // answer - 0 and 1
    correctAnswer,
    randomAnswer,
    progress;   // stores setTimeout ID

// user can select either 0 (F) or 1 (T)
var rightWrong = document.querySelectorAll('.right-wrong')[0],
    scoreDiv = document.querySelector('#score');

// buttons (images) event listener 
rightWrong.addEventListener('click', function(e) {
	userChoice = parseInt(e.target.id);
	play (userChoice);
});

// keyboard event listener 
window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }
    
    var pressedValue = 0
    
	switch (event.key) {
		case "ArrowLeft":
			// "left arrow" key press
			break;
		case "ArrowRight":
			// "right arrow" key press
			pressedValue = 1;
			break;
		break;
			default:
			return; // Quit when this doesn't handle the key event.
	}
    
    play (pressedValue);

	// Cancel the default action to avoid it being handled twice
	event.preventDefault();
	
}, true);

// function to move progress bar
function moveProgressBar() {

	var status = document.querySelector('#status');
	time = 0;

	progress = setInterval(green, 20);

	function green() {
		if (time >= 100) {
			clearInterval(progress);
			exitGame();
		} else if (score >= 10) {
			time +=1;
		} else {
			time +=0.5;
		}  status.style.width = time + "%";
	}
}

// random question generation
function generateQuestion() {

	var questionDiv = document.querySelector('#question'),
		answerDiv = document.querySelector('#answer');

	var firstNumber = Math.floor(Math.random() * 45 + 21);
	var secondNumber = Math.floor(Math.random() * 35 + 21);

	// generates random addition, subtraction or multiplication question
	var operations = [
		function(a, b) {
			questionDiv.innerHTML = a + " + " + b;
			return a + b;
		},
		function(a, b) {
			questionDiv.innerHTML = a + " - " + b;
			return a - b;
		},
		function(a, b) {
			questionDiv.innerHTML = a  + " x " + b;
			return a * b;
		}
	];

	var num = Math.floor(Math.random() * 2.5);
	var num2 = Math.floor(Math.random() * 3);

	correctAnswer = operations[num](firstNumber, secondNumber);

	// collection of random answers
	var randomAnswers = [correctAnswer - 3, correctAnswer, correctAnswer + num2 + 1];
	randomAnswer = randomAnswers[num2];
	answerDiv.innerHTML = randomAnswer;

}

// exits the game and displays the final score
function exitGame() {

	clearInterval(progress);

	// display a new screen with final score and option to play again
	var finalScreen = document.querySelectorAll('.final-screen')[0],
	    finalScore = document.querySelector('#finalScore'),
	    playAgain = document.querySelector('#play-again');

	// hiding main and score container      
	document.querySelectorAll('.container')[0].style.display = "none";
	document.querySelectorAll('.score-container')[0].style.display = "none";

	// display the result screen with final score
	finalScreen.style.display = "block";
	finalScore.innerHTML = score;

	// play again button click handler
	playAgain.addEventListener('click', function() {

		clearInterval(progress);
		score = 0;
		scoreDiv.innerHTML = score;
		startGame();

		finalScreen.style.display = "none";
		document.querySelectorAll('.container')[0].style.display = "block";
		document.querySelectorAll('.score-container')[0].style.display = "block";
	});
}

// starts the game. gets called on window.onload.
function startGame() {
	
	// fill the question div with new random question
	generateQuestion();
	
	// start the timer
	moveProgressBar();
}

function play(pressedValue) {
        
	// correct option can be 1 or 0 depending on the random answer generated.
    var correctOption = (correctAnswer === randomAnswer) ? 1 : 0;

    // append the score and post a new question if right answer choosen
    if (pressedValue === correctOption) {
        score++;
        scoreDiv.innerHTML = score;
        clearInterval(progress);
        startGame();
        return;
    } else {
        // exit the game if wrong answer
        exitGame();
        clearInterval(progress);
        return;
    }    
};

// start math game on window load
window.onload = startGame;