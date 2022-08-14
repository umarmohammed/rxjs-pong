import { fromEvent, map, filter, combineLatest, merge, Observable } from "rxjs";
import { startWith } from "rxjs/operators";
import { KeysPressed } from "./keys-pressed";
import { mergeObjects } from "./util";

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
        [keyPressToMove[key]]: keyPressEvent === "keydown",
      }))
    );
}

const createKeyDownObservable = keyEventHof("keydown");
const createKeyUpObservable = keyEventHof("keyup");

function createKeyPressedObservable(
  key: GameKeys
): Observable<Record<string, boolean>> {
  return merge(createKeyDownObservable(key), createKeyUpObservable(key)).pipe(
    startWith({ [keyPressToMove[key]]: false })
  );
}

export const keysPressed$: Observable<KeysPressed> = combineLatest(
  gameKeys.map(createKeyPressedObservable)
).pipe(map(mergeObjects<KeysPressed>));
