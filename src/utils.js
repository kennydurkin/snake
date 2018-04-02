import { DIMENSIONS } from './consts';

// Ensures random coordinates within range and divisible by our unit size
export function getNewPelletPosition() {
  return {
    x: Math.floor(Math.random() * (DIMENSIONS.width / 10)) * 10,
    y: Math.floor(Math.random() * (DIMENSIONS.height / 10)) * 10
  };
}

export function isSamePosition(a, b) {
  return `${a.x}-${a.y}` === `${b.x}-${b.y}`;
}

export function isWallCollision(head) {
  return (
    head.x >= DIMENSIONS.width ||
    head.x < 0 ||
    head.y >= DIMENSIONS.height ||
    head.y < 0
  );
}
