import { scan } from "rxjs";
import { move$ } from "./input";
import { renderState } from "./render";
import { initialState, reducer, State } from "./state";

export function startGame() {
  const state$ = move$.pipe(scan(reducer, initialState));

  state$.subscribe(renderState);
}
