import { Paddle } from "./paddle.interface";
import { State } from "./state";

const width = 512;
const height = 256;

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

  const canvas = document.getElementById("board") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "green";
  ctx.fillRect(10, 10, 150, 100);

  // root.replaceChildren(
  //   renderPaddle(state.leftPaddle),
  //   renderPaddle(state.rightPaddle)
  // );
}
