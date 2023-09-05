// export const winGame = () => {};

export const winLevel = () => {
  console.log('You win the level!');
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
