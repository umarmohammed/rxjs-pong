import { interval, map } from "rxjs";
import { BallMoveAction } from "./action";
import { Ball } from "./ball.interface";
import { PADDLE_HEIGHT, PADDLE_WIDTH } from "./dimensions";
import { Paddle } from "./paddle.interface";

function ballIntersectsPaddle(
  ball: Ball,
  paddle: Paddle,
  side: "right" | "left"
) {
  console.log({ ball, paddle, side });

  const ballWithinPaddleY =
    ball.y > paddle.y && ball.y < paddle.y + PADDLE_HEIGHT;
  const ballWillHitLeftPaddleX =
    side === "left" &&
    getNextBallPosition(ball).x < paddle.x + PADDLE_WIDTH &&
    ball.direction.x < 0;
  const ballWillHitRightPaddleX =
    side === "right" &&
    getNextBallPosition(ball).x > paddle.x - PADDLE_WIDTH &&
    ball.direction.x > 0;

  return (
    ballWithinPaddleY && (ballWillHitLeftPaddleX || ballWillHitRightPaddleX)
  );
}

function getNextBallPosition(ball: Ball): Ball {
  return {
    ...ball,
    x: ball.x + ball.direction.x,
    y: ball.y + ball.direction.y,
  };
}

export type MoveBall = (
  ball: Ball,
  leftPaddle: Paddle,
  rightPaddle: Paddle
) => Ball;

function moveBall(ball: Ball, leftPaddle: Paddle, rightPaddle: Paddle): Ball {
  const direction =
    ballIntersectsPaddle(ball, leftPaddle, "left") ||
    ballIntersectsPaddle(ball, rightPaddle, "right")
      ? { x: ball.direction.x * -1, y: ball.direction.y }
      : ball.direction;

  return {
    ...getNextBallPosition(ball),
    direction,
  };
}

export const ballMove$ = interval(20).pipe(
  map(() => new BallMoveAction(moveBall))
);
