import {
  fromEvent,
  map,
  filter,
  combineLatest,
  merge,
  Observable,
  tap,
} from "rxjs";
import { startWith } from "rxjs/operators";
import { Move, KeysPressed } from "./keys-pressed";
import { mergeObjects } from "./util";

const keyPressEvents = ["keydown", "keyup"] as const;
type KeyPressEvent = typeof keyPressEvents[number];

const gameKeys = ["q", "a", "o", "l"] as const;
type GameKeys = typeof gameKeys[number];

export const keyPressToMove: Record<GameKeys, Move> = {
  q: { direction: "up", side: "left" },
  a: { direction: "down", side: "left" },
  o: { direction: "up", side: "right" },
  l: { direction: "down", side: "right" },
};

function keyEventHof(keyPressEvent: KeyPressEvent) {
  return (key: GameKeys) =>
    fromEvent<KeyboardEvent>(window, keyPressEvent).pipe(
      filter((keyboardEvent) => keyboardEvent.key === key),
      map(
        () =>
          new Map<Move, boolean>([
            [keyPressToMove[key], keyPressEvent === "keydown"],
          ])
      )
    );
}

const createKeyDownObservable = keyEventHof("keydown");
const createKeyUpObservable = keyEventHof("keyup");

function createKeyPressedObservable(
  key: GameKeys
): Observable<Map<Move, boolean>> {
  return merge(createKeyDownObservable(key), createKeyUpObservable(key)).pipe(
    startWith(new Map<Move, boolean>([[keyPressToMove[key], false]]))
  );
}

export const keysPressed$: Observable<Map<Move, boolean>> = combineLatest(
  gameKeys.map(createKeyPressedObservable)
).pipe(
  map(
    (moves) =>
      new Map<Move, boolean>(
        moves.reduce(
          (prev, curr) => [...prev, ...curr],
          [] as [Move, boolean][]
        )
      )
  ),
  tap(console.log)
);
