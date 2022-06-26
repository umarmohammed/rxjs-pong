import { interval, map } from "rxjs";
import { BallMoveAction } from "./action";
import { Ball } from "./ball.interface";

export type MoveBall = (ball: Ball) => Ball;

export const moveBall: MoveBall = (ball) => ({ ...ball, x: ball.x + 10 });

export const ballMove$ = interval(50).pipe(
  map(() => new BallMoveAction(moveBall))
);
