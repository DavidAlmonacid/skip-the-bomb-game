import confetti from 'canvas-confetti';
import {
  game,
  moveKeys,
  renderLives,
  renderMap,
  setScore,
  stopTime,
  timeInterval
} from './main.js';
import { maps, movePlayer } from './utils.js';

const stopGame = () => {
  window.onkeyup = null;
  stopTime(timeInterval);
  setScore(game.lives, game.elapsedTime);

  const resetScreen = document.getElementById('reset-game');
  resetScreen.style.display = 'block';
  resetScreen.innerHTML = `<h1>Score: ${game.score}</h1>`;

  const bestScore = window.localStorage.getItem('BestScore');
  const bestScoreStorage = parseInt(bestScore);

  if (game.score > bestScoreStorage) {
    window.localStorage.setItem('BestScore', game.score);
    resetScreen.innerHTML += '<h2>New Best Score! 🎉</h2>';
  } else {
    resetScreen.innerHTML += `<h2>Best Score: ${bestScore}</h2>`;
  }
};

export const winGame = () => {
  stopGame();

  confetti({
    particleCount: 600,
    spread: 100
  });
};

export const loseGame = () => {
  stopGame();
};

export const winLevel = () => {
  game.currentLevel++;

  if (!maps[game.currentLevel]) {
    winGame();
    return;
  }

  renderMap(maps[game.currentLevel]);
};

export const loseLife = ({ playerPosition, doorPosition }) => {
  const cellPlayer = document.querySelector('.player');

  game.lives--;
  window.onkeyup = null;

  setTimeout(() => {
    // Reset player position
    playerPosition.X = doorPosition.X;
    playerPosition.Y = doorPosition.Y;

    // Reset player cell position
    cellPlayer.style.left = `${playerPosition.X}px`;
    cellPlayer.style.top = `${playerPosition.Y}px`;

    // Reset move event
    if (game.lives !== 0) {
      window.onkeyup = (event) => {
        event.preventDefault();

        if (event.metaKey || event.ctrlKey) {
          return;
        }

        const userKey = event.key.toUpperCase();
        movePlayer({ moveKeys, userKey });
      };
    }
  }, 400);

  renderLives(game.lives);
};
