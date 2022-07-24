import { fromEvent, map, filter, combineLatest, merge, Observable } from "rxjs";
import { startWith } from "rxjs/operators";
import { KeyPress } from "./keypress.type";
import { MoveState } from "./move-state";

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
