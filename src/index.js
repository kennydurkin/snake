import { DIMENSIONS, DIRECTIONS, AXES, DELTAS } from './consts';
import { getNewPelletPosition, isWallCollision, isSamePosition } from './utils';
import { drawGameOver, drawBackground, drawSnake, drawPellet } from './drawing';
import { initialSnake as snake, initialState as gameState } from './inits';

// Our keydown event listener, changes direction if not on the same axis
const updateDirection = e => {
  if (AXES[gameState.direction] !== AXES[DIRECTIONS[e.keyCode]]) {
    gameState.direction = DIRECTIONS[e.keyCode] || gameState.direction;
  }
};

// Moves the snake in the direction its currently going
const updateSnake = () => {
  let newHead = {
    x: snake[0].x,
    y: snake[0].y
  };

  // Determine how much we need to increment by, and on which axis
  const delta = DELTAS[gameState.direction];
  newHead[AXES[gameState.direction]] += delta * DIMENSIONS.unitSize;

  snake.unshift(newHead); // add the new head
  snake.pop(); // snip off the tail
};

// Adds to the snake's length and moves the pellet elsewhere
const updatePellet = () => {
  const tail = snake[snake.length - 1];

  // Invert the deltas since we're adding to the tail
  let xDelta =
    AXES[gameState.direction] === 'x' ? -1 * DELTAS[gameState.direction] : 0;
  let yDelta =
    AXES[gameState.direction] === 'y' ? -1 * DELTAS[gameState.direction] : 0;

  snake.push({
    x: tail.x + 10 * xDelta,
    y: tail.y + 10 * yDelta
  });

  // Reposition the pellet
  gameState.pellet = getNewPelletPosition();
};

// Checks for collisions and pellet gets
const updateGameState = () => {
  const newHead = snake[0];

  // Check if we ate a pellet
  if (gameState.pellet && isSamePosition(newHead, gameState.pellet)) {
    updatePellet();
  }

  // Check if we collided with the wall
  if (isWallCollision(newHead)) {
    gameState.gameOver = true;
  }

  // Check if we collided with our tail
  snake.forEach((snakePiece, idx) => {
    if (snakePiece !== newHead && isSamePosition(newHead, snakePiece)) {
      gameState.gameOver = true;
    }
  });
};

// The main game loop
const tick = (canvas, timerId) => {
  updateSnake();
  updateGameState();

  // Drawing on the canvas
  if (gameState.gameOver) {
    drawGameOver(canvas);
    clearInterval(timerId);
  } else {
    drawBackground(canvas);
    drawSnake(canvas, snake);
    drawPellet(canvas, gameState.pellet);
  }
};

const createCanvas = () => {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('width', DIMENSIONS.width);
  canvas.setAttribute('height', DIMENSIONS.height);
  document.body.appendChild(canvas);
  return canvas;
};

// Initialize our canvas and start the game loop
window.onload = () => {
  const canvas = createCanvas();
  const timerId = window.setInterval(() => tick(canvas, timerId), 100);
  window.onkeydown = e => updateDirection(e);
};
