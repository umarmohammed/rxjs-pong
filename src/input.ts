import {
  fromEvent,
  map,
  filter,
  takeUntil,
  throttleTime,
  repeat,
  combineLatest,
  endWith,
  merge,
  Observable,
} from "rxjs";
import { startWith } from "rxjs/operators";
import { PaddleMoveAction } from "./action";
import { KeyPress } from "./keypress.type";
import { MoveState } from "./move-state";
import { keyPressToMove, moveNone } from "./paddle-move";

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
  endWith(moveNone),
  repeat()
);

const moveRightPaddle$ = rightMoveKeydown$.pipe(
  takeUntil(rightMoveKeyup$),
  endWith(moveNone),
  repeat()
);

export const paddleMove$ = combineLatest([
  moveLeftPaddle$,
  moveRightPaddle$,
]).pipe(map((movePaddles) => new PaddleMoveAction(movePaddles)));

const leftMoveUpKeyPressed$ = fromEvent(window, "keydown").pipe(
  map((x) => (x as KeyboardEvent).key as KeyPress),
  filter((x) => x === "q"),
  map(() => true)
);

const leftMoveUpKeyReleased$ = fromEvent(window, "keyup").pipe(
  map((x) => (x as KeyboardEvent).key as KeyPress),
  filter((x) => x === "q"),
  map(() => false)
);

const leftMoveDownKeyPressed$ = fromEvent(window, "keydown").pipe(
  map((x) => (x as KeyboardEvent).key as KeyPress),
  filter((x) => x === "a"),
  map(() => true)
);

const leftMoveDownKeyReleased$ = fromEvent(window, "keyup").pipe(
  map((x) => (x as KeyboardEvent).key as KeyPress),
  filter((x) => x === "a"),
  map(() => false)
);

const rightMoveDownKeyPressed$ = fromEvent(window, "keydown").pipe(
  map((x) => (x as KeyboardEvent).key as KeyPress),
  filter((x) => x === "l"),
  map(() => true)
);

const rightMoveDownKeyReleased$ = fromEvent(window, "keyup").pipe(
  map((x) => (x as KeyboardEvent).key as KeyPress),
  filter((x) => x === "l"),
  map(() => false)
);

const rightMoveUpKeyPressed$ = fromEvent(window, "keydown").pipe(
  map((x) => (x as KeyboardEvent).key as KeyPress),
  filter((x) => x === "o"),
  map(() => true)
);

const rightMoveUpKeyReleased$ = fromEvent(window, "keyup").pipe(
  map((x) => (x as KeyboardEvent).key as KeyPress),
  filter((x) => x === "o"),
  map(() => false)
);

const leftDown$ = merge(leftMoveDownKeyPressed$, leftMoveDownKeyReleased$).pipe(
  startWith(false)
);
const leftUp$ = merge(leftMoveUpKeyPressed$, leftMoveUpKeyReleased$).pipe(
  startWith(false)
);

const rightDown$ = merge(
  rightMoveDownKeyPressed$,
  rightMoveDownKeyReleased$
).pipe(startWith(false));

const rightUp$ = merge(rightMoveUpKeyPressed$, rightMoveUpKeyReleased$).pipe(
  startWith(false)
);

export const moveState$: Observable<MoveState> = combineLatest([
  leftUp$,
  leftDown$,
  rightUp$,
  rightDown$,
]).pipe(
  map(([leftUp, leftDown, rightUp, rightDown]) => ({
    leftUp,
    leftDown,
    rightUp,
    rightDown,
  }))
);
