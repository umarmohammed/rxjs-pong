import { filter, fromEvent, map, scan } from "rxjs";

const gameKeyPresses = ["a", "q", "o", "l"] as const;

type KeyPress = typeof gameKeyPresses[number];

interface Paddle {
  x: number;
  initialY: number;
  prop: keyof State;
}

const CENTER_Y = 500;

const paddles: Paddle[] = [
  {
    x: 0,
    initialY: CENTER_Y,
    prop: "leftPaddlePosition",
  },
  {
    x: 700,
    initialY: CENTER_Y,
    prop: "rightPaddlePosition",
  },
];

const renderPaddlesFns = paddles.map(renderPaddle);

const renderAllPaddles = (state: State) =>
  renderPaddlesFns.map((x) => x(state));

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

  root.replaceChildren(...renderAllPaddles(state));
}

function renderPaddle(paddle: Paddle) {
  return (state: State) => {
    const paddleDiv = document.createElement("div");

    const paddleTransform = `transform: translate(${paddle.x}px, ${
      state[paddle.prop]
    }px);`;

    paddleDiv.setAttribute(
      "style",
      `background: white; width: 8px; height: 24px; ${paddleTransform}`
    );

    return paddleDiv;
  };
}
