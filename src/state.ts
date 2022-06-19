import { LEFT_PADDLE_X, START_PADDLE_Y, RIGHT_PADDLE_X } from "./dimensions";
import { Paddle } from "./paddle.interface";

export interface State {
  leftPaddle: Paddle;
  rightPaddle: Paddle;
}

export const initialState: State = {
  leftPaddle: {
    x: LEFT_PADDLE_X,
    y: START_PADDLE_Y,
  },
  rightPaddle: { x: RIGHT_PADDLE_X, y: START_PADDLE_Y },
};

export function reducer(
  state: State,
  [leftMove, rightMove]: ((paddle: Paddle) => Paddle)[]
): State {
  return {
    ...state,
    leftPaddle: leftMove(state.leftPaddle),
    rightPaddle: rightMove(state.rightPaddle),
  };
}
