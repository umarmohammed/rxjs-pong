import { scan } from "rxjs";
import { movePaddleKey$ } from "./input";
import { renderState } from "./render";
import { initialState, reducer, State } from "./state";

export function startGame() {
  const state$ = movePaddleKey$.pipe(scan(reducer, initialState));

  state$.subscribe(renderState);
}
