import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_WIDTH,
} from "./dimensions";
import { Paddle } from "./paddle.interface";
import { State } from "./state";

function renderPaddle(ctx: CanvasRenderingContext2D, paddle: Paddle) {
  ctx.fillStyle = "white";
  ctx.fillRect(paddle.x, paddle.y, PADDLE_WIDTH, PADDLE_HEIGHT);
}

export function renderState(state: State) {
  const root = document.getElementById("root") as HTMLDivElement;

  root.style.width = `${BOARD_WIDTH}px`;
  root.style.height = `${BOARD_HEIGHT}px`;

  const canvas = document.getElementById("board") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  canvas.setAttribute("width", BOARD_WIDTH.toString());
  canvas.setAttribute("height", BOARD_HEIGHT.toString());

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);

  renderPaddle(ctx, state.leftPaddle);
  renderPaddle(ctx, state.rightPaddle);
}
