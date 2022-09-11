import { combineLatest, Observable } from "rxjs";
import { map, scan, share, withLatestFrom } from "rxjs/operators";
import {
  LEFT_PADDLE_X,
  PADDLE_Y_MOVE,
  RIGHT_PADDLE_X,
  START_PADDLE_Y,
} from "./dimensions";
import { leftPaddleKeysPressed$, rightPaddleKeysPressed$ } from "./input";
import { KeysPressed } from "./keys-pressed";
import { loop$ } from "./loop";
import { Paddle } from "./paddle.interface";

function createPaddleObservable(
  keysPressed$: Observable<KeysPressed>,
  startX: number
) {
  return loop$.pipe(
    withLatestFrom(keysPressed$),
    map(([, keysPressed]) => keysPressed),
    scan(
      (paddle, keysPressed) => ({
        ...paddle,
        y: keysPressed.up
          ? paddle.y - PADDLE_Y_MOVE
          : keysPressed.down
          ? paddle.y + PADDLE_Y_MOVE
          : paddle.y,
      }),
      { x: startX, y: START_PADDLE_Y } as Paddle
    ),
    share()
  );
}

const leftPaddle$ = createPaddleObservable(
  leftPaddleKeysPressed$,
  LEFT_PADDLE_X
);
const rightPaddle$ = createPaddleObservable(
  rightPaddleKeysPressed$,
  RIGHT_PADDLE_X
);

export const paddles$: Observable<[left: Paddle, right: Paddle]> =
  combineLatest([leftPaddle$, rightPaddle$]);
