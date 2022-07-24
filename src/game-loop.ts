import { interval, map, merge, scan, withLatestFrom } from "rxjs";
import { tap } from "rxjs/operators";
import { UpdateStateAction } from "./action";
import { ballMove$ } from "./ball-move";
import { paddleMove$ } from "./input";
import { renderState } from "./render";
import { initialState, reducer, state$ } from "./state";

export function startGame() {
  const updateState$ = interval(50).pipe(
    withLatestFrom([state$, inputState$]),
    map(([, state, inputState]) => new UpdateStateAction(state, inputState))
  );

  updateState$.pipe(scan(reducer, initialState)).subscribe(renderState);
}
