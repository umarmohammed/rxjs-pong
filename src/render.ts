import { Paddle } from "./paddle.interface";
import { State } from "./state";

function renderPaddle(paddle: Paddle) {
  const paddleDiv = document.createElement("div");

  const paddleTransform = `transform: translate(${paddle.x}px, ${paddle.y}px);`;

  paddleDiv.setAttribute(
    "style",
    `background: white; width: 8px; height: 24px; ${paddleTransform}`
  );

  return paddleDiv;
}

export function renderState(state: State) {
  const root = document.getElementById("root");

  root.replaceChildren(
    renderPaddle(state.leftPaddle),
    renderPaddle(state.rightPaddle)
  );
}
