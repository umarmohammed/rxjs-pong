import { Line } from "./line.interface";

export interface Paddle {
  //TODO use point
  x: number;
  y: number;

  movementAxis: Line;
}
