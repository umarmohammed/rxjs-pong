import { KeyPress } from "./keypress.type";

export interface State {
  leftPaddlePosition: number;
  rightPaddlePosition: number;
}

export const initialState: State = {
  leftPaddlePosition: 500,
  rightPaddlePosition: 500,
};

const keyPressAction: Record<KeyPress, (state: State) => State> = {
  a: (state) => ({
    ...state,
    leftPaddlePosition: state.leftPaddlePosition + 10,
  }),
  q: (state) => ({
    ...state,
    leftPaddlePosition: state.leftPaddlePosition - 10,
  }),
  l: (state) => ({
    ...state,
    rightPaddlePosition: state.rightPaddlePosition + 10,
  }),
  o: (state) => ({
    ...state,
    rightPaddlePosition: state.rightPaddlePosition - 10,
  }),
};

export function reducer(state: State, keyPress: KeyPress) {
  return keyPressAction[keyPress](state);
}
