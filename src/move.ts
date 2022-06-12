import { KeyPress } from "./keypress.type";
import { Paddle } from "./paddle.interface";

type Direction = "up" | "down";

type Side = "left" | "right";

export interface Move {
  side: Side;
  move: any;
}

export const moveUp = move("up");
export const moveDown = move("down");

export const keyPressToMove: Record<KeyPress, Move> = {
  a: { side: "left", move: moveDown },
  l: { side: "right", move: moveDown },
  o: { side: "right", move: moveUp },
  q: { side: "left", move: moveUp },
};

export function move(direction: Direction | null) {
  return (paddle: Paddle): Paddle => ({
    ...paddle,
    y: direction === "down" ? paddle.y + 10 : paddle.y - 10,
  });
}
