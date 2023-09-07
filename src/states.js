import { game, renderMap } from './main.js';
import { maps } from './utils.js';

// export const winGame = () => {};

export const winLevel = () => {
  game.currentLevel++;
  console.log(`Level: ${game.currentLevel}`);

  if (!maps[game.currentLevel]) {
    console.log('You win the game!');
    return;
  }

  renderMap(maps[game.currentLevel]);
};

// export const loseGame = () => {};

export const loseLife = ({ playerPosition, doorPosition }) => {
  console.log('You lose a life!');

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
