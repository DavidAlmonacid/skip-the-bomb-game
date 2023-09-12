import { loseGame } from './states.js';
import { emojis, maps, movePlayer } from './utils.js';

import './style.css';

const app = document.getElementById('app');
const gameGrid = document.getElementById('game-grid');
const gameLives = document.getElementById('game-lives');
const cellPlayer = document.createElement('div');

app.onclick = () => {
  gameGrid.style.userSelect = 'none';
};

gameGrid.onselectstart = (event) => {
  event.preventDefault();
};

export const game = {
  gridWidth: gameGrid.clientWidth,
  gridHeight: gameGrid.clientHeight,
  cellWidth: gameGrid.clientWidth / 10,
  cellHeight: gameGrid.clientHeight / 10,
  currentLevel: 1,
  lives: 3,
  doorPosition: { X: 0, Y: 0 },
  playerPosition: { X: 0, Y: 0 },
  giftPosition: { X: 0, Y: 0 },
  bombPositions: []
};

export const moveKeys = {
  UP: ['W', 'ARROWUP'],
  RIGHT: ['D', 'ARROWRIGHT'],
  DOWN: ['S', 'ARROWDOWN'],
  LEFT: ['A', 'ARROWLEFT']
};

export const renderMap = (map) => {
  gameGrid.innerHTML = '';
  const bombPositions = [];

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      const currentChar = map[i][j];

      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.innerText = emojis[currentChar];

      // Set starting player position
      if (currentChar === 'O') {
        game.doorPosition.X = j * game.cellWidth;
        game.doorPosition.Y = i * game.cellHeight;

        game.playerPosition.X = game.doorPosition.X;
        game.playerPosition.Y = game.doorPosition.Y;

        cellPlayer.className = 'cell player';
        cellPlayer.innerText = emojis.PLAYER;
        cellPlayer.style.position = 'absolute';
        cellPlayer.style.left = `${game.playerPosition.X}px`;
        cellPlayer.style.top = `${game.playerPosition.Y}px`;

        gameGrid.appendChild(cellPlayer);
      }

      // Set gift position
      if (currentChar === 'I') {
        game.giftPosition.X = j * game.cellWidth;
        game.giftPosition.Y = i * game.cellHeight;
      }

      // Set bombs positions
      if (currentChar === 'X') {
        bombPositions.push({
          X: j * game.cellWidth,
          Y: i * game.cellHeight
        });

        game.bombPositions = bombPositions;
      }

      gameGrid.appendChild(cell);
    }
  }
};

export const renderLives = (lives) => {
  if (lives === 0) {
    gameLives.textContent = `0 ${emojis.SAD}`;
    gameLives.style.opacity = 0.4;

    loseGame();
    return;
  }

  gameLives.textContent = '';

  for (let i = 0; i < lives; i++) {
    gameLives.textContent += emojis.HEART;
  }
};

renderMap(maps[game.currentLevel]);
renderLives(game.lives);

window.onkeyup = (event) => {
  event.preventDefault();

  if (event.metaKey || event.ctrlKey) {
    return;
  }

  const userKey = event.key.toUpperCase();
  movePlayer({ moveKeys, userKey });
};
