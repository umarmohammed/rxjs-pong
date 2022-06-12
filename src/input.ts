import { fromEvent, map, filter } from "rxjs";
import { KeyPress, gameKeyPresses } from "./keypress.type";

export const movePaddleKey$ = fromEvent(window, "keyup").pipe(
  map((x) => (x as KeyboardEvent).key as KeyPress),
  filter((x) => gameKeyPresses.includes(x))
);
