import { KeyPress } from "./keypress.type";
import { Paddle } from "./paddle.interface";

type Direction = "up" | "down";

type Side = "left" | "right";

export interface Move {
  side: Side;
  translate: (paddle: Paddle) => Paddle;
}

export const moveUp = move("up");
export const moveDown = move("down");

export const keyPressToMove: Record<KeyPress, Move> = {
  a: { side: "left", translate: moveDown },
  l: { side: "right", translate: moveDown },
  o: { side: "right", translate: moveUp },
  q: { side: "left", translate: moveUp },
};

export function move(direction: Direction | null) {
  return (paddle: Paddle): Paddle => ({
    ...paddle,
    y: direction === "down" ? paddle.y + 10 : paddle.y - 10,
  });
}
