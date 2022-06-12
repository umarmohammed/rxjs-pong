import { fromEvent, map, filter } from "rxjs";
import { KeyPress, gameKeyPresses } from "./keypress.type";
import { keyPressToMove } from "./move";

export const move$ = fromEvent(window, "keyup").pipe(
  map((x) => (x as KeyboardEvent).key as KeyPress),
  filter((x) => gameKeyPresses.includes(x)),
  map((x) => keyPressToMove[x])
);
