const btnRock = document.querySelector('.rock');
const btnPaper = document.querySelector('.paper');
const btnScissors = document.querySelector('.scissor');
const displayPlayerScore = document.querySelector('.p-count.count');
const displayComputerScore = document.querySelector('.c-count.count');
const displayNumRounds = document.querySelector('.movesleft');
const winner_Per_Round = document.querySelector('.verdict');


// Initialize scores
let playerScore = 0;
let computerScore = 0;
let roundsPlayed = 0;
const totalRounds = 5;
let gameEnded = false;

// Add event listeners to the buttons
btnRock.addEventListener("click", handlePlayerSelection);
btnPaper.addEventListener("click", handlePlayerSelection);
btnScissors.addEventListener("click", handlePlayerSelection);

function handlePlayerSelection(event) {
    if (gameEnded) {
        return;
    }

    const playerChoice = event.target.classList.contains("rock")
        ? "rock"
        : event.target.classList.contains("paper")
        ? "paper"
        : "scissors";

    playRound(playerChoice, getComputerChoice());
    updateScores();
    checkGameEnd();
    
}

// Function to update the scores and rounds display
function updateScores() {
    displayPlayerScore.textContent = playerScore;
    displayComputerScore.textContent = computerScore;
    roundsPlayed++;
    displayNumRounds.textContent = 'Rounds left: ' + (totalRounds - roundsPlayed);
}



// Function to check if the game has ended
function checkGameEnd() {
    if (roundsPlayed === totalRounds) {
        endGame();
        displayResults();
    }
}

// Function to end the game and determine the winner
function endGame() {
    gameEnded = true;

    console.log("Game Over!");
    console.log("Player Score: " + playerScore);
    console.log("Computer Score: " + computerScore);

    if (playerScore > computerScore) {
        console.log("You win the game!");
    } else if (computerScore > playerScore) {
        console.log("Computer wins the game!");
    } else {
        console.log("It's a tie game!");
    }

// Remove event listeners to when the 5 rounds is done so game does not run endlessly
    btnRock.removeEventListener("click", handlePlayerSelection);
    btnPaper.removeEventListener("click", handlePlayerSelection);
    btnScissors.removeEventListener("click", handlePlayerSelection);
}

// Function to play a single round of Rock Paper Scissors
function playRound(playerSelection, computerSelection) {
    const result = getResult(playerSelection, computerSelection);
    console.log(result);

    if (result.includes("You win!")) {
        playerScore++;
    } else if (result.includes("Computer wins!")) {
        computerScore++;
    }
}

// Function to get the computer's choice
function getComputerChoice() {
    let options = ["rock", "paper", "scissors"];
    let randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}


// Function to determine the result of a round
function getResult(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        winner_Per_Round.textContent = "It's a tie! You both picked the same choice!";
        return "It's a tie! You both picked the same choice!";
        
    } else if (
        (playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")
    ) {
        winner_Per_Round.textContent = "You win! " + playerSelection + " beats " + computerSelection;
        return "You win! " + playerSelection + " beats " + computerSelection;
    } else {
        winner_Per_Round.textContent = "Computer wins! " + computerSelection + " beats " + playerSelection;
        return "Computer wins! " + computerSelection + " beats " + playerSelection;
    }
}

//this part is going to display that the game is over and who won
function displayResults() {
    gameEnded = true;

    let gameOverMessage = "";
    if (playerScore > computerScore) {
        gameOverMessage = "You win the game!";
    } else if (computerScore > playerScore) {
        gameOverMessage = "Computer wins the game!";
    } else {
        gameOverMessage = "It's a tie game!";
    }

    alert("Game Over!\n" + gameOverMessage);

    btnRock.removeEventListener("click", handlePlayerSelection);
    btnPaper.removeEventListener("click", handlePlayerSelection);
    btnScissors.removeEventListener("click", handlePlayerSelection);

    setTimeout(function () {
        window.location.reload(); // Reload the entire game
    }, 1000); // Wait for 1 second before reloading
}