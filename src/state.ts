import { KeyPress } from "./keypress.type";
import { keyPressToMove } from "./move";
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

export function reducer(state: State, keyPress: KeyPress): State {
  switch (keyPressToMove[keyPress].side) {
    case "left":
      return {
        ...state,
        leftPaddle: keyPressToMove[keyPress].move(state.leftPaddle),
      };
    case "right":
      return {
        ...state,
        rightPaddle: keyPressToMove[keyPress].move(state.rightPaddle),
      };
    default:
      return state;
  }
}
