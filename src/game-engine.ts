import { interval, map, scan, withLatestFrom } from "rxjs";
import { move$ } from "./input";
import { renderState } from "./render";
import { initialState, reducer } from "./state";

export function startGame() {
  const state$ = move$.pipe(scan(reducer, initialState));

  const game$ = interval(50).pipe(
    withLatestFrom(state$),
    map(([_, state]) => state)
  );

  game$.subscribe(renderState);
}
