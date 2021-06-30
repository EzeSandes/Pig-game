// Elements

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const winNumberEl = document.getElementById('input--win--number');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnGo = document.querySelector('.btn--input--number');

let scores, //Array
   maxScore, // Score to win
   currentScore,
   activePlayer,
   playing;


const init = function () {
   scores = [0, 0];
   maxScore = 0;
   currentScore = 0;
   activePlayer = 0;
   playing = 0; //To know if the game continues.

   score0El.textContent = 0;
   score1El.textContent = 0;

   current0El.textContent = 0;
   current1El.textContent = 0;

   diceEl.classList.add('hidden');
   player0El.classList.remove('player--winner');
   player1El.classList.remove('player--winner');

   player0El.classList.add('player--active'); // Always active in the beginning
   player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
   document.getElementById(`current--${activePlayer}`).textContent = 0;

   activePlayer = activePlayer === 0 ? 1 : 0;
   player0El.classList.toggle('player--active');
   player1El.classList.toggle('player--active');
}

/*************** ROLL DICE ******** */