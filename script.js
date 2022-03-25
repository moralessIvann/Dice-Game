'use strict';

// selecting elements
const btnNewGameElement = document.querySelector('.btn--new');
const btnRollDiceElement = document.querySelector('.btn--roll');
const btnHoldScoreElement = document.querySelector('.btn--hold');

const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');

const currentScore0Element = document.getElementById('current--0');
const currentScore1Element = document.getElementById('current--1');

const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

const diceElement = document.querySelector('.dice');

let diceRandomNumber, currentScore, activePlayer, activeGame, scores;
 
// initial conditions
const init = function () {
    score0Element.textContent = 0;
    score1Element.textContent = 0;
    currentScore = 0;
    activePlayer = 0;
    scores = [0, 0];
    activeGame = true;

    player0Element.classList.add('player--active');
    player1Element.classList.remove('player--active');
    player0Element.classList.remove('player--winner');
    player1Element.classList.remove('player--winner');

    score0Element.textContent = 0;
    score1Element.textContent = 0;
    currentScore0Element.textContent = 0;
    currentScore1Element.textContent = 0;
    
    diceElement.classList.add('hidden');
}
init();

// switch player
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
}

// roll the dice 
btnRollDiceElement.addEventListener('click', function () {
    if (activeGame) {
        diceElement.classList.remove('hidden');
        diceRandomNumber = Math.trunc(Math.random()*6) + 1;
        // console.log(diceRandomNumber);
        diceElement.src = `dice-${diceRandomNumber}.png`; //changing dice num img
        activePlayer = player0Element.classList.contains('player--active') ? 0 : 1; //check active player
        // console.log('player',activePlayer);

        if (diceRandomNumber != 1) {
            // keep rolling the dice and add current score
            currentScore += diceRandomNumber;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }else {
            // switch player
        switchPlayer();
        } 
    }
});

// hold score
btnHoldScoreElement.addEventListener('click', function () {
    if (activeGame) {
        // adding current scores
        scores[activePlayer] += currentScore;
        // console.log('scores',scores[activePlayer]);
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // check player score
        if (scores[activePlayer] >= 10) {
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            diceElement.classList.add('hidden');
            activeGame = false;
        }else {
            switchPlayer();
        }
    }
});

btnNewGameElement.addEventListener('click', init);