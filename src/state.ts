import { Actions, ActionType } from "./action";
import { Ball } from "./ball.interface";
import {
  LEFT_PADDLE_X,
  START_PADDLE_Y,
  RIGHT_PADDLE_X,
  BOARD_CENTER_Y,
} from "./dimensions";
import { Paddle } from "./paddle.interface";

export interface State {
  leftPaddle: Paddle;
  rightPaddle: Paddle;
  ball: Ball;
}

export const initialState: State = {
  leftPaddle: {
    x: LEFT_PADDLE_X,
    y: START_PADDLE_Y,
  },
  rightPaddle: { x: RIGHT_PADDLE_X, y: START_PADDLE_Y },
  ball: { x: 0, y: BOARD_CENTER_Y },
};

export function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case ActionType.PaddleMove: {
      const [leftMove, rightMove] = action.payload;

      return {
        ...state,
        leftPaddle: leftMove(state.leftPaddle),
        rightPaddle: rightMove(state.rightPaddle),
      };
    }

    default: {
      return state;
    }
  }
}
