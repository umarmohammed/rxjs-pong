import { KeyPress } from "./keypress.type";
import { keyPressToMove, Move } from "./move";
import { Paddle } from "./paddle.interface";

const CENTER_Y = 500;

export interface State {
  leftPaddle: Paddle;
  rightPaddle: Paddle;
}

export const initialState: State = {
  leftPaddle: {
    x: 0,
    y: CENTER_Y,
  },
  rightPaddle: { x: 700, y: CENTER_Y },
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
