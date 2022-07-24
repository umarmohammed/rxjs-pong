import { Ball } from "./ball.interface";
import {
  BALL_HEIGHT,
  BALL_WIDTH,
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

function renderBall(ctx: CanvasRenderingContext2D, ball: Ball) {
  ctx.fillStyle = "white";
  ctx.fillRect(ball.x, ball.y, BALL_WIDTH, BALL_HEIGHT);
}

export function renderState(state: State) {
  function renderBoard() {
    const canvas = document.getElementById("board") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    canvas.setAttribute("width", BOARD_WIDTH.toString());
    canvas.setAttribute("height", BOARD_HEIGHT.toString());

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);

    renderPaddle(ctx, state.leftPaddle);
    renderPaddle(ctx, state.rightPaddle);
    renderBall(ctx, state.ball);
  }

  function renderScore(id: string, score: number) {
    const scoreElement = document.getElementById(id) as HTMLSpanElement;
    scoreElement.innerText = score.toString();
  }

  // Can we do this once at the start?
  const root = document.getElementById("root") as HTMLDivElement;
  root.style.width = `${BOARD_WIDTH}px`;
  root.style.height = `${BOARD_HEIGHT}px`;

  renderBoard();
  renderScore("leftPlayerScore", state.leftPlayerScore);
  renderScore("rightPlayerScore", state.rightPlayerScore);
}
