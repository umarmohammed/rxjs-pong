import { interval, map, merge, scan, withLatestFrom } from "rxjs";
import { ballMove$ } from "./ball-move";
import { paddleMove$ } from "./input";
import { renderState } from "./render";
import { initialState, reducer } from "./state";

export function startGame() {
  const state$ = merge(paddleMove$, ballMove$).pipe(
    scan(reducer, initialState)
  );

  const game$ = interval(50).pipe(
    withLatestFrom(state$),
    map(([_, state]) => state)
  );

  game$.subscribe(renderState);
}
