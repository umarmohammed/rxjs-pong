import { interval, map, scan, withLatestFrom } from "rxjs";
import { UpdateStateAction } from "./action";
import { moveState$ } from "./input";
import { renderState } from "./render";
import { initialState, reducer } from "./state";

export function startGame() {
  const action$ = interval(50).pipe(
    withLatestFrom(moveState$),
    map(([, moveState]) => new UpdateStateAction(moveState))
  );

  action$.pipe(scan(reducer, initialState)).subscribe(renderState);
}
