import { fromEvent, map, filter, combineLatest, merge, Observable } from "rxjs";
import { startWith } from "rxjs/operators";
import { KeysPressed } from "./keys-pressed";
import { mergeObjects } from "./util";

const keyPressEvents = ["keydown", "keyup"] as const;
type KeyPressEvent = typeof keyPressEvents[number];

const leftPaddleGameKeys = ["q", "a"] as const;
const rightPaddleGameKeys = ["o", "l"] as const;

type LeftPaddleGameKeys = typeof leftPaddleGameKeys[number];
type RightPaddleGameKeys = typeof rightPaddleGameKeys[number];
type GameKeys = LeftPaddleGameKeys | RightPaddleGameKeys;

export const keyPressToMove: Record<GameKeys, keyof KeysPressed> = {
  q: "decrease",
  a: "increase",
  o: "decrease",
  l: "increase",
};

function keyEventHof(keyPressEvent: KeyPressEvent) {
  return (key: LeftPaddleGameKeys | RightPaddleGameKeys) =>
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
  key: LeftPaddleGameKeys | RightPaddleGameKeys
): Observable<Record<string, boolean>> {
  return merge(createKeyDownObservable(key), createKeyUpObservable(key)).pipe(
    startWith({ [keyPressToMove[key]]: false })
  );
}

export const leftPaddleKeysPressed$ = combineLatest(
  leftPaddleGameKeys.map(createKeyPressedObservable)
).pipe(map(mergeObjects<KeysPressed>));

export const rightPaddleKeysPressed$ = combineLatest(
  rightPaddleGameKeys.map(createKeyPressedObservable)
).pipe(map(mergeObjects<KeysPressed>));
