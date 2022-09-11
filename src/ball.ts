import { map, scan, share, withLatestFrom } from "rxjs";
import { moveBall } from "./ball-move";
import { getInitialBall } from "./ball.interface";
import { loop$ } from "./loop";
import { paddles$ } from "./paddles";

export const ball$ = loop$.pipe(
  withLatestFrom(paddles$),
  map(([_, paddles]) => paddles),
  scan(
    (ball, [leftPaddle, rightPaddle]) =>
      moveBall(ball, leftPaddle, rightPaddle),
    getInitialBall()
  ),
  share()
);
