import { LEFT_PADDLE_X, START_PADDLE_Y, RIGHT_PADDLE_X } from "./dimensions";
import { Move } from "./move";
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

export function reducer(state: State, move: Move): State {
  const { side, translate } = move;

  switch (side) {
    case "left":
      return {
        ...state,
        leftPaddle: translate(state.leftPaddle),
      };
    case "right":
      return {
        ...state,
        rightPaddle: translate(state.rightPaddle),
      };
    default:
      return state;
  }
}
