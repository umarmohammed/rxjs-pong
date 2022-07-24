import { Actions, ActionType } from "./action";
import { moveBall } from "./ball-move";
import { Ball, getInitialBall } from "./ball.interface";
import { LEFT_PADDLE_X, START_PADDLE_Y, RIGHT_PADDLE_X } from "./dimensions";
import { MoveState } from "./move-state";
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
  ball: getInitialBall(),
};

export function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case ActionType.UpdateState: {
      return updateState(state, action.payload);
    }

    default: {
      return state;
    }
  }
}

function updateState(state: State, moveState: MoveState): State {
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
  };
}
