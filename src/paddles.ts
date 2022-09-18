import { combineLatest, Observable } from "rxjs";
import { map, scan, share, withLatestFrom } from "rxjs/operators";
import { BOARD_HEIGHT, LEFT_PADDLE_X, RIGHT_PADDLE_X } from "./dimensions";
import { leftPaddleKeysPressed$, rightPaddleKeysPressed$ } from "./input";
import { KeysPressed } from "./keys-pressed";
import { Line } from "./line.interface";
import { loop$ } from "./loop";
import { createPaddle, move, Paddle } from "./paddle.interface";

function createPaddleObservable(
  keysPressed$: Observable<KeysPressed>,
  movementAxis: Line
) {
  return loop$.pipe(
    withLatestFrom(keysPressed$),
    map(([, keysPressed]) => keysPressed),
    scan(move, createPaddle(movementAxis)),
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
