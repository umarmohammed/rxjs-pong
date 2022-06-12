import { State } from "./state";

export interface Paddle {
  x: number;
  initialY: number;
  prop: keyof State;
}
