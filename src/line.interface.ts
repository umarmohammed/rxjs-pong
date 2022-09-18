import { Point } from "./point";

export interface Line {
  start: Point;
  end: Point;
}

export function getLineMidpoint({ start, end }: Line): Point {
  return {
    x: (start.x + end.x) / 2,
    y: (start.y + end.y) / 2,
  };
}
