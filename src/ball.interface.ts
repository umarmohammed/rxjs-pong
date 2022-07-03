import {
  BOARD_CENTER_X,
  BOARD_CENTER_Y,
  BALL_INITIAL_DIRECTION,
} from "./dimensions";
import { Vector } from "./vector";

export interface Ball {
  x: number;
  y: number;
  direction: Vector;
}

export function getInitialBall(): Ball {
  const toDirection = {
    1: -1,
    2: 1,
  };

  const x =
    BALL_INITIAL_DIRECTION.x * toDirection[Math.floor(Math.random() * 2) + 1];

  return {
    x: BOARD_CENTER_X,
    y: BOARD_CENTER_Y,
    direction: { ...BALL_INITIAL_DIRECTION, x },
  };
}
