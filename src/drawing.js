import {
  DIMENSIONS,
  COLORS,
  BG_COLOR,
  TEXT_COLOR,
  PELLET_COLOR
} from './consts';

export function drawGameOver(canvas) {
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = TEXT_COLOR;
  ctx.textBaseline = 'top';
  ctx.font = '24px sans-serif';
  ctx.fillText('Game over!', 50, 50);
  ctx.fillText('Reload to play again :)', 50, 100);
}

export function drawBackground(canvas) {
  let ctx = canvas.getContext('2d');
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, DIMENSIONS.width, DIMENSIONS.height);
}

export function drawSnake(canvas, snake) {
  let ctx = canvas.getContext('2d');
  snake.forEach((snakePiece, idx) => {
    ctx.fillStyle = COLORS[idx % COLORS.length]; // rainbow effect!
    ctx.fillRect(
      snakePiece.x,
      snakePiece.y,
      DIMENSIONS.unitSize,
      DIMENSIONS.unitSize
    );
  });
}

export function drawPellet(canvas, pellet) {
  let ctx = canvas.getContext('2d');
  ctx.fillStyle = PELLET_COLOR;
  ctx.fillRect(pellet.x, pellet.y, DIMENSIONS.unitSize, DIMENSIONS.unitSize);
}
