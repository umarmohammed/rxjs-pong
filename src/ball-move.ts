import { Ball, getInitialBall } from "./ball.interface";
import {
  BALL_HEIGHT,
  BOARD_HEIGHT,
  BOARD_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_WIDTH,
} from "./dimensions";
import { Paddle } from "./paddle.interface";

function ballIntersectsPaddle(
  ball: Ball,
  paddle: Paddle,
  side: "right" | "left"
) {
  const ballWithinPaddleY =
    ball.y > paddle.y && ball.y < paddle.y + PADDLE_HEIGHT;
  const ballWillHitLeftPaddleX =
    side === "left" && ball.x < paddle.x + PADDLE_WIDTH && ball.direction.x < 0;
  const ballWillHitRightPaddleX =
    side === "right" &&
    ball.x > paddle.x - PADDLE_WIDTH &&
    ball.direction.x > 0;

  return (
    ballWithinPaddleY && (ballWillHitLeftPaddleX || ballWillHitRightPaddleX)
  );
}

function bounceBallOffPaddle(
  ball: Ball,
  leftPaddle: Paddle,
  rightPaddle: Paddle
): Ball {
  return ballIntersectsPaddle(ball, leftPaddle, "left") ||
    ballIntersectsPaddle(ball, rightPaddle, "right")
    ? {
        ...ball,
        direction: { x: ball.direction.x * -1, y: ball.direction.y },
      }
    : ball;
}

export function ballOutOfBounds(ball: Ball): number {
  return ball.x < 0 ? -1 : ball.x > BOARD_WIDTH ? 1 : 0;
}

function bounceBallOffHorizontalWall(ball: Ball): Ball {
  const ballWithinBoard = ball.y <= BOARD_HEIGHT - BALL_HEIGHT && ball.y >= 0;

  return ballWithinBoard
    ? ball
    : {
        ...ball,
        direction: { ...ball.direction, y: ball.direction.y * -1 },
      };
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

export function moveBall(
  ball: Ball,
  leftPaddle: Paddle,
  rightPaddle: Paddle
): Ball {
  if (ballOutOfBounds(ball)) {
    return getInitialBall();
  }

  const nextBall = getNextBallPosition(ball);

  const newBall = bounceBallOffHorizontalWall(
    bounceBallOffPaddle(nextBall, leftPaddle, rightPaddle)
  );

  return newBall;
}
