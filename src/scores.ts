import {
  combineLatest,
  map,
  Observable,
  scan,
  share,
  withLatestFrom,
} from "rxjs";
import { ball$ } from "./ball";
import { ballOutOfBounds } from "./ball-move";
import { loop$ } from "./loop";

function createScoreObservable(check: (outOfBounds: number) => boolean) {
  return loop$.pipe(
    withLatestFrom(ball$),
    map(([_, ball]) => ball),
    scan(
      (score, ball) => (check(ballOutOfBounds(ball)) ? score + 1 : score),
      0
    ),
    share()
  );
}

const leftPaddleScore$ = createScoreObservable(
  (outOfBounds) => outOfBounds > 0
);
const rightPaddleScore$ = createScoreObservable(
  (outOfBounds) => outOfBounds < 0
);

export const scores$: Observable<[left: number, right: number]> = combineLatest(
  [leftPaddleScore$, rightPaddleScore$]
);
