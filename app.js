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


const MIN_SCORE = 10;
let MAX_SCORE;

let scores, //Array
   currentScore,
   activePlayer,
   playing; // Boolean


const init = function () {
   scores = [0, 0];
   currentScore = 0;
   activePlayer = 0;
   playing = false; //To know if the game continues.

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


const switchPlayer = function () {
   document.getElementById(`current--${activePlayer}`).textContent = 0;
   activePlayer = activePlayer === 0 ? 1 : 0;
   currentScore = 0;
   player0El.classList.toggle('player--active');
   player1El.classList.toggle('player--active');
}

const showError = function (errorMsg = 'Something went wrong') {
   alert(errorMsg);
}

/*************** Winning Score ******** */

const setWinScore = function (winningScore) {

   if (winningScore < MIN_SCORE)
      showError(`${winningScore} it's a low number. Please, choose a bigger one.`);
   else {
      playing = true;
      MAX_SCORE = winningScore;
   }
}

/*************** ROLL DICE ******** */

btnRoll.addEventListener('click', function () {
   if (playing) {

      // 1.Generate a random dice
      const dice = Math.trunc(Math.random() * 6) + 1;

      // 2.Display Dice roll
      diceEl.classList.remove('hidden');
      diceEl.src = `img/dice-${dice}.png`;

      // 3.It is 1 ?
      if (dice != 1) {
         currentScore += dice;
         document.getElementById(`current--${activePlayer}`).textContent = currentScore;
      } else
         switchPlayer();

   } else
      showError('Please, choose a Win Score first.');
});

/*************** btn Hold ******** */

btnHold.addEventListener('click', function () {
   if (playing) {
      scores[activePlayer] += currentScore;
      document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

      if (scores[activePlayer] >= MAX_SCORE) {
         playing = false;
         diceEl.classList.add('hidden');
         document.getElementById(`score--${activePlayer}`).textContent = 'WINNER🥳';
         document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
         document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      }

      switchPlayer();
   } else
      showError('Start a game, please.');
});

/*************** btn Let's GO! ******** */

btnGo.addEventListener('click', function () {
   if (!playing) {
      init();
      setWinScore(+winNumberEl.value);
   }
   else
      showError('Please, finish the actual game first or press \'New Game\'');
});

/*************** btn NEW GAME ******** */

btnNew.addEventListener('click', init);

init();