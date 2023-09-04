import './style.css';
import { emojis, maps } from './utils.js';

// const canvas = document.getElementById('game');
// const game = canvas.getContext('2d');

// const startGame = () => {
//   const elementsSize = canvas.width / 10;

//   game.font = `${elementsSize - 8}px Arial`;

//   for (let i = 0; i < 10; i++) {
//     game.fillText(emojis.X, elementsSize * i - 5, elementsSize);

//     game.fillText(emojis.X, -5, elementsSize * (i + 1) - 12);
//   }
// };

// window.addEventListener('load', startGame);

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

const playerPosition = {
  X: 0,
  Y: 0
};

const renderMap = (map) => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      const currentChar = map[i][j];

      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.innerText = emojis[currentChar];

      if (currentChar === 'O') {
        playerPosition.X = j * cellWidth;
        playerPosition.Y = i * cellHeight;

        cellPlayer.classList.add('cell');
        cellPlayer.innerText = emojis.PLAYER;
        cellPlayer.style.position = 'absolute';
        cellPlayer.style.left = `${playerPosition.X}px`;
        cellPlayer.style.top = `${playerPosition.Y}px`;

        gameGrid.appendChild(cellPlayer);
      }

      gameGrid.appendChild(cell);
    }
  }
};

renderMap(maps.map1);

window.addEventListener('keyup', (event) => {
  event.preventDefault();

  const userKey = event.key.toUpperCase();

  const moveKeys = {
    UP: ['W', 'ARROWUP'],
    RIGHT: ['D', 'ARROWRIGHT'],
    DOWN: ['S', 'ARROWDOWN'],
    LEFT: ['A', 'ARROWLEFT']
  };

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

          playerPosition.Y -= cellHeight;
          break;
        case 'RIGHT':
          newWidth = playerPosition.X + cellWidth;

          if (newWidth > gridWidth - cellWidth) {
            return;
          }

          playerPosition.X += cellWidth;
          break;
        case 'DOWN':
          newHeight = playerPosition.Y + cellHeight;

          if (newHeight > gridHeight - cellHeight) {
            return;
          }

          playerPosition.Y += cellHeight;
          break;
        case 'LEFT':
          newWidth = playerPosition.X - cellWidth;

          if (newWidth < 0) {
            return;
          }

          playerPosition.X -= cellWidth;
          break;
      }

      cellPlayer.style.left = `${playerPosition.X}px`;
      cellPlayer.style.top = `${playerPosition.Y}px`;

      break;
    }
  }
});
