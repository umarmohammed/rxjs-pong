import { combineLatest, Observable } from "rxjs";
import { map, scan, share, withLatestFrom } from "rxjs/operators";
import {
  BOARD_HEIGHT,
  LEFT_PADDLE_X,
  PADDLE_Y_MOVE,
  RIGHT_PADDLE_X,
} from "./dimensions";
import { leftPaddleKeysPressed$, rightPaddleKeysPressed$ } from "./input";
import { KeysPressed } from "./keys-pressed";
import { getLineMidpoint, Line } from "./line.interface";
import { loop$ } from "./loop";
import { Paddle } from "./paddle.interface";

function createPaddleObservable(
  keysPressed$: Observable<KeysPressed>,
  movementAxis: Line
) {
  return loop$.pipe(
    withLatestFrom(keysPressed$),
    map(([, keysPressed]) => keysPressed),
    scan(
      (paddle, keysPressed) => ({
        ...paddle,
        y: keysPressed.decrease
          ? paddle.y - PADDLE_Y_MOVE
          : keysPressed.increase
          ? paddle.y + PADDLE_Y_MOVE
          : paddle.y,
      }),

      {
        x: getLineMidpoint(movementAxis).x,
        y: getLineMidpoint(movementAxis).y,
      } as Paddle
    ),
    share()
  );
}

const leftPaddle$ = createPaddleObservable(leftPaddleKeysPressed$, {
  start: { x: LEFT_PADDLE_X, y: 0 },
  end: { x: LEFT_PADDLE_X, y: BOARD_HEIGHT },
});
const rightPaddle$ = createPaddleObservable(rightPaddleKeysPressed$, {
  start: { x: RIGHT_PADDLE_X, y: 0 },
  end: { x: RIGHT_PADDLE_X, y: BOARD_HEIGHT },
});

export const paddles$: Observable<[left: Paddle, right: Paddle]> =
  combineLatest([leftPaddle$, rightPaddle$]);
