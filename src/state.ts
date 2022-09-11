import { ballOutOfBounds, moveBall } from "./ball-move";
import { Ball, getInitialBall } from "./ball.interface";
import { LEFT_PADDLE_X, START_PADDLE_Y, RIGHT_PADDLE_X } from "./dimensions";
import {
  KeysPressed,
  keysPressedToSide,
  Move,
  paddleDeltaY,
} from "./keys-pressed";
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
    side: "left",
  },
  rightPaddle: { x: RIGHT_PADDLE_X, y: START_PADDLE_Y, side: "right" },
  ball: getInitialBall(),
  leftPlayerScore: 0,
  rightPlayerScore: 0,
};

export function reducer(state: State, moves: Map<Move, boolean>): State {
  const outOfBounds = ballOutOfBounds(state.ball);

  function updatePaddles() {
    const paddles = [state.leftPaddle, state.rightPaddle];
    // return paddles.map((paddle) => ({
    //   ...paddle,
    //   y: moves[{side: paddle.side, direction: }],
    // }));

    // const foo = moves.entries();

    // // moves.

    const updatedPaddles: Paddle[] = [];

    for (const [move, pressed] of moves.entries()) {
      if (pressed) {
        const paddle = paddles.find((paddle) => paddle.side === move.side);
        if (paddle) {
          updatedPaddles.push({
            ...paddle,
            y: paddle.y + paddleDeltaY[move.direction],
          });
        }
      }
    }

    return updatePaddles;
  }

  return {
    ...state,
    // leftPaddle: leftUp
    //   ? { ...state.leftPaddle, y: state.leftPaddle.y - 10 }
    //   : leftDown
    //   ? { ...state.leftPaddle, y: state.leftPaddle.y + 10 }
    //   : state.leftPaddle,
    // rightPaddle: rightUp
    //   ? { ...state.rightPaddle, y: state.rightPaddle.y - 10 }
    //   : rightDown
    //   ? { ...state.rightPaddle, y: state.rightPaddle.y + 10 }
    //   : state.rightPaddle,
    ...updatePaddles(),
    ball: moveBall(state.ball, state.leftPaddle, state.rightPaddle),
    leftPlayerScore:
      outOfBounds > 0 ? state.leftPlayerScore + 1 : state.leftPlayerScore,
    rightPlayerScore:
      outOfBounds < 0 ? state.rightPlayerScore + 1 : state.rightPlayerScore,
  };
}
