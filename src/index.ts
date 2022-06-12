import { filter, fromEvent, map, scan } from "rxjs";

const gameKeyPresses = ["a", "q", "o", "l"] as const;

type KeyPress = typeof gameKeyPresses[number];

const keyPressAction: Record<KeyPress, (state: State) => State> = {
  a: (state) => ({
    ...state,
    leftPaddlePosition: state.leftPaddlePosition + 10,
  }),
  q: (state) => ({
    ...state,
    leftPaddlePosition: state.leftPaddlePosition - 10,
  }),
  l: (state) => ({
    ...state,
    rightPaddlePosition: state.rightPaddlePosition + 10,
  }),
  o: (state) => ({
    ...state,
    rightPaddlePosition: state.rightPaddlePosition - 10,
  }),
};

const movePaddleKey$ = fromEvent(window, "keyup").pipe(
  map((x) => (x as KeyboardEvent).key as KeyPress),
  filter((x) => gameKeyPresses.includes(x))
);

movePaddleKey$.subscribe(console.log);

interface State {
  leftPaddlePosition: number;
  rightPaddlePosition: number;
}

const initialState: State = {
  leftPaddlePosition: 500,
  rightPaddlePosition: 500,
};

const state$ = movePaddleKey$.pipe(scan(reducer, initialState));

function reducer(state: State, keyPress: KeyPress) {
  return keyPressAction[keyPress](state);
}

state$.subscribe(renderState);

function renderState(state: State) {
  const root = document.getElementById("root");

  root.replaceChildren(renderLeftPaddle(state), renderRightPaddle(state));
}

function renderLeftPaddle(state: State) {
  const leftPaddle = document.createElement("div");

  const leftPaddleTransform = `transform: translate(0px, ${state.leftPaddlePosition}px);`;

  leftPaddle.setAttribute(
    "style",
    `background: white; width: 8px; height: 24px; ${leftPaddleTransform}`
  );

  return leftPaddle;
}

function renderRightPaddle(state: State) {
  const rightPaddle = document.createElement("div");

  const rightPaddleTransform = `transform: translate(700px, ${state.rightPaddlePosition}px);`;

  rightPaddle.setAttribute(
    "style",
    `background: white; width: 8px; height: 24px; ${rightPaddleTransform}`
  );

  return rightPaddle;
}
