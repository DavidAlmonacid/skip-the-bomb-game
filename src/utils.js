import { loseLife, winLevel } from './states.js';

export const emojis = {
  '-': '',
  O: '🚪',
  X: '💣',
  I: '🎁',
  PLAYER: '💀',
  BOMB_COLLISION: '🔥',
  GAME_OVER: '👎',
  WIN: '🏆'
};

export const maps = {
  map1: [
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
  map2: [
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
  ]
};

export const movePlayer = ({
  moveKeys,
  userKey,
  objectPositions,
  gameDimensions
}) => {
  const { doorPosition, playerPosition, giftPosition, bombsPositions } =
    objectPositions;
  const { gridWidth, gridHeight, cellWidth, cellHeight } = gameDimensions;

  for (const key in moveKeys) {
    const element = moveKeys[key];

    if (element.includes(userKey)) {
      let newWidth = 0;
      let newHeight = 0;

      switch (key) {
        case 'UP':
          newHeight = playerPosition.Y - cellHeight;

          if (newHeight < 0) {
            return;
          }

          playerPosition.Y = newHeight;
          break;

        case 'RIGHT':
          newWidth = playerPosition.X + cellWidth;

          if (newWidth > gridWidth - cellWidth) {
            return;
          }

          playerPosition.X = newWidth;
          break;

        case 'DOWN':
          newHeight = playerPosition.Y + cellHeight;

          if (newHeight > gridHeight - cellHeight) {
            return;
          }

          playerPosition.Y = newHeight;
          break;

        case 'LEFT':
          newWidth = playerPosition.X - cellWidth;

          if (newWidth < 0) {
            return;
          }

          playerPosition.X = newWidth;
          break;
      }

      const cellPlayer = document.querySelector('.player');
      cellPlayer.style.left = `${playerPosition.X}px`;
      cellPlayer.style.top = `${playerPosition.Y}px`;

      // Check if player has found the gift
      if (
        playerPosition.X === giftPosition.X &&
        playerPosition.Y === giftPosition.Y
      ) {
        winLevel();
      }

      // Check if player has collided with a bomb
      const hasCollided = bombsPositions.some((bombPosition) => {
        return (
          playerPosition.X === bombPosition.X &&
          playerPosition.Y === bombPosition.Y
        );
      });

      if (hasCollided) {
        loseLife({ playerPosition, doorPosition });
      }

      break;
    }
  }
};
