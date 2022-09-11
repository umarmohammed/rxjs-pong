import { Direction, Side } from "./side";

export interface KeysPressed {
  leftUp: boolean;
  leftDown: boolean;
  rightUp: boolean;
  rightDown: boolean;
}

export interface Move {
  side: Side;
  direction: Direction;
}

export const keysPressedToSide = new Map<Move, keyof KeysPressed>([
  [{ side: "left", direction: "up" }, "leftUp"],
  [{ side: "left", direction: "down" }, "leftDown"],
  [{ side: "right", direction: "up" }, "rightUp"],
  [{ side: "right", direction: "down" }, "rightDown"],
]);

export const paddleDeltaY: Record<Direction, number> = {
  down: 10,
  up: -10,
};
