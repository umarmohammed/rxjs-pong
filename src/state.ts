import { ballOutOfBounds, moveBall } from "./ball-move";
import { Ball, getInitialBall } from "./ball.interface";
import { LEFT_PADDLE_X, START_PADDLE_Y, RIGHT_PADDLE_X } from "./dimensions";
import { MoveState } from "./move-state";
import { Paddle } from "./paddle.interface";

export interface State {
  leftPaddle: Paddle;
  rightPaddle: Paddle;
  ball: Ball;
  leftPlayerScore: number;
  rightPlayerScore: number;
}

export const initialState: State = {
  leftPaddle: {
    x: LEFT_PADDLE_X,
    y: START_PADDLE_Y,
  },
  rightPaddle: { x: RIGHT_PADDLE_X, y: START_PADDLE_Y },
  ball: getInitialBall(),
  leftPlayerScore: 0,
  rightPlayerScore: 0,
};

export function reducer(state: State, moveState: MoveState): State {
  const outOfBounds = ballOutOfBounds(state.ball);

  return {
    ...state,
    leftPaddle: moveState.leftUp
      ? { ...state.leftPaddle, y: state.leftPaddle.y - 10 }
      : moveState.leftDown
      ? { ...state.leftPaddle, y: state.leftPaddle.y + 10 }
      : state.leftPaddle,
    rightPaddle: moveState.rightUp
      ? { ...state.rightPaddle, y: state.rightPaddle.y - 10 }
      : moveState.rightDown
      ? { ...state.rightPaddle, y: state.rightPaddle.y + 10 }
      : state.rightPaddle,
    ball: moveBall(state.ball, state.leftPaddle, state.rightPaddle),
    leftPlayerScore:
      outOfBounds > 0 ? state.leftPlayerScore + 1 : state.leftPlayerScore,
    rightPlayerScore:
      outOfBounds < 0 ? state.rightPlayerScore + 1 : state.rightPlayerScore,
  };
}
