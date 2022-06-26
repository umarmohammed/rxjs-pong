import { interval, map } from "rxjs";
import { BallMoveAction } from "./action";
import { Ball } from "./ball.interface";
import { BOARD_WIDTH } from "./dimensions";

export type MoveBall = (ball: Ball) => Ball;

function moveBall(ball: Ball): Ball {
  const direction =
    (ball.x < BOARD_WIDTH && ball.direction.x > 0) ||
    (ball.x > 0 && ball.direction.x < 0)
      ? ball.direction
      : { x: ball.direction.x * -1, y: 0 };

  return {
    x: ball.x + ball.direction.x,
    y: ball.y + ball.direction.y,
    direction,
  };
}

export const ballMove$ = interval(50).pipe(
  map(() => new BallMoveAction(moveBall))
);
