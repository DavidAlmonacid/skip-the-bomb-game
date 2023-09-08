import confetti from 'canvas-confetti';
import { game, moveKeys, renderLives, renderMap } from './main.js';
import { maps, movePlayer } from './utils.js';

const resetGame = () => {
  const resetScreen = document.getElementById('reset-game');
  resetScreen.style.display = 'block';

  window.onkeyup = null;
};

export const winGame = () => {
  resetGame();

  confetti({
    particleCount: 600,
    spread: 100
  });
};

export const loseGame = () => {
  resetGame();
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
        const userKey = event.key.toUpperCase();

        movePlayer({ moveKeys, userKey });
      };
    }
  }, 400);

  renderLives(game.lives);
};
