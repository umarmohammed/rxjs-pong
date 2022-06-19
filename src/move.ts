import { KeyPress } from "./keypress.type";
import { Paddle } from "./paddle.interface";

type Direction = "up" | "down";

export const identity = <T>(x: T) => x;

export const moveUp = move("up");
export const moveDown = move("down");
export const moveNone = identity;

export const keyPressToMove: Record<KeyPress, (paddle: Paddle) => Paddle> = {
  a: moveDown,
  l: moveDown,
  o: moveUp,
  q: moveUp,
};

export function move(direction: Direction | null) {
  const map: Record<Direction, number> = {
    down: 10,
    up: -10,
  };

  return (paddle: Paddle): Paddle => ({
    ...paddle,
    y: paddle.y + map[direction],
  });
}
