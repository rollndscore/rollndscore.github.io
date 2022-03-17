"use strict";

// getElementbyID is faster than queryselector

const player0Element = document.querySelector(".player--0");
const player1Element = document.querySelector(".player--1");
const score0Element = document.getElementById("score--0");
const score1Element = document.getElementById("score--1");
const diceElement = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const current0Element = document.getElementById("current--0");
const current1Element = document.getElementById("current--1");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
let currentScore, activePlayer, playing, scores;

const bgMusic = new Audio("./Sounds/FallenLeaves.mp3");
const victoryMusic = new Audio("./Sounds/Victory.wav");
const rollMusic = new Audio("./Sounds/Roll.wav");
const newGameMusic = new Audio("./Sounds/NewGame.wav");
const holdMusic = new Audio("./Sounds/Hold.wav");
const switchMusic = new Audio("./SOunds/Switch.wav");



// Initialinzing Game Function
const init = function () {
  bgMusic.volume = 0.1;
  bgMusic.loop = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  diceElement.classList.add("hidden");
  player0Element.classList.remove("player--winner");
  player1Element.classList.remove("player--winner");
  document.getElementById("name--0").classList.remove("player--winner");
  document.getElementById("name--1").classList.remove("player--winner");
  player0Element.classList.add("player--active");
  player1Element.classList.remove("player--active");
  bgMusic.play();
};

// Starting Game
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = "0";
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle("player--active");
  player1Element.classList.toggle("player--active");
  switchMusic.play();
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    rollMusic.play();
    const diceValue = Math.ceil(Math.random() * 6);

    diceElement.classList.remove("hidden");
    diceElement.src = `./Images/dice-${diceValue}.png`;

    if (diceValue !== 1) {
      currentScore += diceValue;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  // 1. Add current score to the current active player
  if (playing) {
    holdMusic.play();
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Finish the Game
    // check if score >= 100 if it is then the current player wins
    if (scores[activePlayer] >= 100) {
      victoryMusic.play();
      diceElement.classList.add("hidden");
      playing = false;
      document.querySelector(".player--active").classList.add("player--winner");
      document
        .getElementById(`name--${activePlayer}`)
        .classList.add("player--winner");
      // document.getElementById(`name--${activePlayer}`).classList.add('name');
      console.log("Player Wins");
      document
        .querySelector(".player--active")
        .classList.remove("player--active");
    }

    // 3. else switch user
    else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", function () {
  newGameMusic.play();
  init();
});

bgMusic.play();