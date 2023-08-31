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

app.addEventListener('click', () => {
  gameGrid.style.userSelect = 'none';
});

gameGrid.addEventListener('selectstart', (event) => {
  event.preventDefault();
});

const renderMap = (map) => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.innerText = emojis[map[i][j]];

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
    if (Object.hasOwn(moveKeys, key)) {
      const element = moveKeys[key];

      if (element.includes(userKey)) {
        console.log(key);
        break;
      }
    }
  }
});
