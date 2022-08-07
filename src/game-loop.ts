import { interval, map, scan, withLatestFrom } from "rxjs";
import { keysPressed$ } from "./input";
import { renderState } from "./render";
import { initialState, reducer } from "./state";

export function startGame() {
  interval(50)
    .pipe(
      withLatestFrom(keysPressed$),
      map(([, keysPressed]) => keysPressed),
      scan(reducer, initialState)
    )
    .subscribe(renderState);
}
