import { interval, map, scan, withLatestFrom } from "rxjs";
import { moveState$ } from "./input";
import { renderState } from "./render";
import { initialState, reducer } from "./state";

export function startGame() {
  interval(50)
    .pipe(
      withLatestFrom(moveState$),
      map(([, moveState]) => moveState),
      scan(reducer, initialState)
    )
    .subscribe(renderState);
}
