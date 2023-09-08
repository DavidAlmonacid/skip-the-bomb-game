import { game } from './main.js';
import { loseLife, winLevel } from './states.js';

export const emojis = {
  '-': '',
  O: '🚪',
  X: '💣',
  I: '🎁',
  PLAYER: '💀',
  BOMB_COLLISION: '🔥',
  GAME_OVER: '👎',
  WIN: '🏆',
  HEART: '❤️',
  SAD: '💔'
};

export const maps = {
  1: [
    ['I', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['-', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['-', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['-', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['-', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['-', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['-', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['-', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['-', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['O', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X']
  ],
  2: [
    ['O', '-', '-', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', '-', '-', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', '-', '-', '-', '-', 'X', 'X', 'X', 'X'],
    ['X', '-', '-', 'X', 'X', '-', 'X', 'X', 'X', 'X'],
    ['X', '-', 'X', 'X', 'X', '-', '-', 'X', 'X', 'X'],
    ['X', '-', 'X', 'X', 'X', 'X', '-', 'X', 'X', 'X'],
    ['X', 'X', '-', '-', 'X', 'X', '-', '-', 'X', 'X'],
    ['X', 'X', '-', '-', 'X', 'X', 'X', '-', 'X', 'X'],
    ['X', 'X', 'X', 'X', '-', '-', '-', 'I', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X']
  ],
  3: [
    ['I', '-', '-', '-', '-', '-', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', '-', 'X', 'X', 'X', 'X'],
    ['X', 'X', '-', '-', '-', '-', 'X', 'X', 'X', 'X'],
    ['X', 'X', '-', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', '-', '-', '-', '-', '-', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', '-', 'X', 'X', 'X'],
    ['X', 'X', '-', '-', '-', '-', '-', 'X', 'X', 'X'],
    ['X', 'X', '-', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', '-', '-', '-', '-', '-', 'O', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X']
  ]
};

export const movePlayer = ({ moveKeys, userKey }) => {
  for (const key in moveKeys) {
    const element = moveKeys[key];

    if (element.includes(userKey)) {
      let newWidth = 0;
      let newHeight = 0;

      switch (key) {
        case 'UP':
          newHeight = game.playerPosition.Y - game.cellHeight;

          if (newHeight < 0) {
            return;
          }

          game.playerPosition.Y = newHeight;
          break;

        case 'RIGHT':
          newWidth = game.playerPosition.X + game.cellWidth;

          if (newWidth > game.gridWidth - game.cellWidth) {
            return;
          }

          game.playerPosition.X = newWidth;
          break;

        case 'DOWN':
          newHeight = game.playerPosition.Y + game.cellHeight;

          if (newHeight > game.gridHeight - game.cellHeight) {
            return;
          }

          game.playerPosition.Y = newHeight;
          break;

        case 'LEFT':
          newWidth = game.playerPosition.X - game.cellWidth;

          if (newWidth < 0) {
            return;
          }

          game.playerPosition.X = newWidth;
          break;
      }

      const cellPlayer = document.querySelector('.player');
      cellPlayer.style.left = `${game.playerPosition.X}px`;
      cellPlayer.style.top = `${game.playerPosition.Y}px`;

      // Check if player has found the gift
      if (
        game.playerPosition.X === game.giftPosition.X &&
        game.playerPosition.Y === game.giftPosition.Y
      ) {
        winLevel();
      }

      // Check if player has collided with a bomb
      const hasCollided = game.bombPositions.some((bombPosition) => {
        return (
          game.playerPosition.X === bombPosition.X &&
          game.playerPosition.Y === bombPosition.Y
        );
      });

      if (hasCollided) {
        const { playerPosition, doorPosition } = game;
        loseLife({ playerPosition, doorPosition });
      }

      break;
    }
  }
};
