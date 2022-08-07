import { fromEvent, map, filter, combineLatest, merge, Observable } from "rxjs";
import { startWith } from "rxjs/operators";
import { KeysPressed } from "./keys-pressed";

const keyPressEvents = ["keydown", "keyup"] as const;

type KeyPressEvent = typeof keyPressEvents[number];

const gameKeys = ["q", "a", "o", "l"] as const;
type GameKeys = typeof gameKeys[number];

export const keyPressToMove: Record<GameKeys, keyof KeysPressed> = {
  q: "leftUp",
  a: "leftDown",
  o: "rightUp",
  l: "rightDown",
};

function keyEventHof(keyPressEvent: KeyPressEvent) {
  return (key: GameKeys) =>
    fromEvent<KeyboardEvent>(window, keyPressEvent).pipe(
      filter((keyboardEvent) => keyboardEvent.key === key),
      map(() => ({
        move: keyPressToMove[key],
        keyPressed: keyPressEvent === "keydown",
      }))
    );
}

const createKeyDownObservable = keyEventHof("keydown");
const createKeyUpObservable = keyEventHof("keyup");

function createKeyPressedObservable(key: GameKeys) {
  return merge(createKeyDownObservable(key), createKeyUpObservable(key)).pipe(
    startWith({ move: keyPressToMove[key], keyPressed: false })
  );
}

export const keysPressed$: Observable<KeysPressed> = combineLatest(
  gameKeys.map(createKeyPressedObservable)
).pipe(
  map((keysPressed) =>
    keysPressed.reduce(
      (prev, { move, keyPressed }) => ({ ...prev, [move]: keyPressed }),
      {} as KeysPressed
    )
  )
);
