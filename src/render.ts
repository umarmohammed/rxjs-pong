import { Paddle } from "./paddle.interface";
import { State } from "./state";

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

export function renderState(state: State) {
  const root = document.getElementById("root");

  root.replaceChildren(...renderAllPaddles(state));
}
