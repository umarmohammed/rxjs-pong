import { filter, fromEvent, map, scan } from "rxjs";

const gameKeyPresses = ["ArrowDown", "ArrowUp"] as const;

type KeyPress = typeof gameKeyPresses[number];

const keyPressAction: Record<KeyPress, (state: State) => State> = {
  ArrowDown: (state) => ({
    ...state,
    leftPaddlePosition: state.leftPaddlePosition + 10,
  }),
  ArrowUp: (state) => ({
    ...state,
    leftPaddlePosition: state.leftPaddlePosition - 10,
  }),
};

const movePaddleKey$ = fromEvent(window, "keyup").pipe(
  map((x) => (x as KeyboardEvent).key as KeyPress),
  filter((x) => gameKeyPresses.includes(x))
);

movePaddleKey$.subscribe(console.log);

interface State {
  leftPaddlePosition: number;
}

const initialState: State = {
  leftPaddlePosition: 500,
};

const state$ = movePaddleKey$.pipe(scan(reducer, initialState));

function reducer(state: State, keyPress: KeyPress) {
  return keyPressAction[keyPress](state);
}

state$.subscribe(renderState);

function renderState(state: State) {
  const root = document.getElementById("root");

  const leftPaddle = document.createElement("div");

  const leftPaddleTransform = `transform: translate(0px, ${state.leftPaddlePosition}px);`;

  leftPaddle.setAttribute(
    "style",
    `background: white; width: 8px; height: 24px; ${leftPaddleTransform}`
  );

  root.replaceChildren(leftPaddle);
}
