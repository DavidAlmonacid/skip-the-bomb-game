import { emojis, maps, movePlayer } from './utils.js';

import './style.css';

const app = document.getElementById('app');
const gameGrid = document.getElementById('game-grid');
const cellPlayer = document.createElement('div');

const gridWidth = gameGrid.clientWidth;
const gridHeight = gameGrid.clientHeight;
const cellWidth = gridWidth / 10;
const cellHeight = gridHeight / 10;

app.addEventListener('click', () => {
  gameGrid.style.userSelect = 'none';
});

gameGrid.addEventListener('selectstart', (event) => {
  event.preventDefault();
});

const doorPosition = {
  X: 0,
  Y: 0
};

const playerPosition = {
  X: 0,
  Y: 0
};

const giftPosition = {
  X: 0,
  Y: 0
};

const bombPositions = [];

const renderMap = (map) => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      const currentChar = map[i][j];

      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.innerText = emojis[currentChar];

      // Set starting player position
      if (currentChar === 'O') {
        doorPosition.X = j * cellWidth;
        doorPosition.Y = i * cellHeight;

        playerPosition.X = doorPosition.X;
        playerPosition.Y = doorPosition.Y;

        cellPlayer.className = 'cell player';
        cellPlayer.innerText = emojis.PLAYER;
        cellPlayer.style.position = 'absolute';
        cellPlayer.style.left = `${playerPosition.X}px`;
        cellPlayer.style.top = `${playerPosition.Y}px`;

        gameGrid.appendChild(cellPlayer);
      }

      // Set gift position
      if (currentChar === 'I') {
        giftPosition.X = j * cellWidth;
        giftPosition.Y = i * cellHeight;
      }

      // Set bombs positions
      if (currentChar === 'X') {
        bombPositions.push({
          X: j * cellWidth,
          Y: i * cellHeight
        });
      }

      gameGrid.appendChild(cell);
    }
  }
};

renderMap(maps.map1);

console.log('giftPosition:', giftPosition);
console.log('initialPlayerPosition:', playerPosition);

window.addEventListener('keyup', (event) => {
  event.preventDefault();

  const userKey = event.key.toUpperCase();

  const moveKeys = {
    UP: ['W', 'ARROWUP'],
    RIGHT: ['D', 'ARROWRIGHT'],
    DOWN: ['S', 'ARROWDOWN'],
    LEFT: ['A', 'ARROWLEFT']
  };

  const objectPositions = {
    doorPosition,
    playerPosition,
    giftPosition,
    bombsPositions: bombPositions
  };

  const gameDimensions = {
    gridWidth,
    gridHeight,
    cellWidth,
    cellHeight
  };

  movePlayer({ moveKeys, userKey, objectPositions, gameDimensions });
});
