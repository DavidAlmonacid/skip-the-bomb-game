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

const grid = document.getElementById('grid-game');

for (let i = 0; i < maps.length; i++) {
  for (let j = 0; j < maps[i].length; j++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.innerText = emojis[maps[i][j]];

    grid.appendChild(cell);
  }
}
