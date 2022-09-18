import { PADDLE_MOVE } from "./dimensions";
import { KeysPressed } from "./keys-pressed";
import { getLineMidpoint, Line } from "./line.interface";

export interface Paddle {
  //TODO use point
  x: number;
  y: number;

  movementAxis: Line;
}

export function createPaddle(movementAxis: Line): Paddle {
  const { x, y } = getLineMidpoint(movementAxis);
  return {
    x,
    y,
    movementAxis,
  };
}

export function move(paddle: Paddle, keyPressed: KeysPressed) {
  if (paddle.movementAxis.start.x === paddle.movementAxis.end.x) {
    return {
      ...paddle,
      y: keyPressed.decrease
        ? paddle.y - PADDLE_MOVE
        : keyPressed.increase
        ? paddle.y + PADDLE_MOVE
        : paddle.y,
    };
  } else {
    return {
      ...paddle,
      x: keyPressed.decrease
        ? paddle.x - PADDLE_MOVE
        : keyPressed.increase
        ? paddle.x + PADDLE_MOVE
        : paddle.x,
    };
  }
}
