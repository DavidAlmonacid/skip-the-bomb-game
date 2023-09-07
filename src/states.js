import confetti from 'canvas-confetti';
import { game, renderMap } from './main.js';
import { maps } from './utils.js';

export const winGame = () => {
  const screenWin = document.getElementById('reset-game');
  screenWin.style.display = 'block';

  confetti({
    particleCount: 600,
    spread: 100
  });

  window.onkeyup = null;
};

export const winLevel = () => {
  game.currentLevel++;

  if (!maps[game.currentLevel]) {
    winGame();
    return;
  }

  renderMap(maps[game.currentLevel]);
};

// export const loseGame = () => {};

export const loseLife = ({ playerPosition, doorPosition }) => {
  const cellPlayer = document.querySelector('.player');

  setTimeout(() => {
    // Reset player position
    playerPosition.X = doorPosition.X;
    playerPosition.Y = doorPosition.Y;

    // Reset player cell position
    cellPlayer.style.left = `${playerPosition.X}px`;
    cellPlayer.style.top = `${playerPosition.Y}px`;
  }, 250);
};
