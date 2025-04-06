let userScore = 0;
let compScore = 0;
let round = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const roundDisplay = document.querySelector("#round");
const resetBtn = document.querySelector("#reset-btn");
const themeToggle = document.querySelector("#theme-toggle");

const winSound = document.querySelector("#win-sound");
const loseSound = document.querySelector("#lose-sound");
const drawSound = document.querySelector("#draw-sound");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "Game was Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
  drawSound.play();
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
    winSound.play();
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
    loseSound.play();
  }
};

const clearSelection = () => {
  choices.forEach(choice => choice.classList.remove("selected"));
};

const playGame = (userChoice) => {
  clearSelection();
  document.getElementById(userChoice).classList.add("selected");

  const compChoice = genCompChoice();
  round++;
  roundDisplay.innerText = round;

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

resetBtn.addEventListener("click", () => {
  userScore = 0;
  compScore = 0;
  round = 0;
  userScorePara.innerText = 0;
  compScorePara.innerText = 0;
  roundDisplay.innerText = 0;
  msg.innerText = "Play your move";
  msg.style.backgroundColor = "#081b31";
  clearSelection();
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
