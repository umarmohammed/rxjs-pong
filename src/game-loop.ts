import { combineLatest, map } from "rxjs";
import { ball$ } from "./ball";
import { paddles$ } from "./paddles";
import { renderState } from "./render";
import { scores$ } from "./scores";

export function startGame() {
  combineLatest([paddles$, ball$, scores$])
    .pipe(
      map(([paddles, ball, scores]) => ({ paddles, ball, scores })),
      map(renderState)
    )
    .subscribe();
}
