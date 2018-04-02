import { DIMENSIONS } from './consts';
import { getNewPelletPosition } from './utils';

// Initial snake
export let initialSnake = [
  { x: 40, y: DIMENSIONS.height / 2 },
  { x: 30, y: DIMENSIONS.height / 2 },
  { x: 20, y: DIMENSIONS.height / 2 },
  { x: 10, y: DIMENSIONS.height / 2 }
];

// Initial game state
export const initialState = {
  direction: 'RIGHT',
  gameOver: false,
  pellet: getNewPelletPosition()
};
