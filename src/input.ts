import {
  fromEvent,
  map,
  filter,
  takeUntil,
  throttleTime,
  repeat,
  merge,
} from "rxjs";
import { KeyPress } from "./keypress.type";
import { keyPressToMove } from "./move";

const leftMoveKeyup$ = fromEvent(window, "keyup").pipe(
  map((x) => (x as KeyboardEvent).key as KeyPress),
  filter((x) => x === "q" || x === "a")
);

const leftMoveKeydown$ = fromEvent(window, "keydown").pipe(
  map((x) => (x as KeyboardEvent).key as KeyPress),
  filter((x) => x === "q" || x === "a"),
  map((x) => keyPressToMove[x]),
  throttleTime(50)
);

const rightMoveKeyup$ = fromEvent(window, "keyup").pipe(
  map((x) => (x as KeyboardEvent).key as KeyPress),
  filter((x) => x === "o" || x === "l")
);

const rightMoveKeydown$ = fromEvent(window, "keydown").pipe(
  map((x) => (x as KeyboardEvent).key as KeyPress),
  filter((x) => x === "o" || x === "l"),
  map((x) => keyPressToMove[x]),
  throttleTime(50)
);

const moveLeftPaddle$ = leftMoveKeydown$.pipe(
  takeUntil(leftMoveKeyup$),
  repeat()
);

const moveRightPaddle$ = rightMoveKeydown$.pipe(
  takeUntil(rightMoveKeyup$),
  repeat()
);

export const move$ = merge(moveLeftPaddle$, moveRightPaddle$);
