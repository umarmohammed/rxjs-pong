import { filter, fromEvent, map, of } from "rxjs";

const movePaddleKey$ = fromEvent(window, "keyup").pipe(
  map((x) => x as KeyboardEvent),
  filter((x) => x.key === "ArrowDown" || x.key === "ArrowUp")
);

movePaddleKey$.subscribe(console.log);
