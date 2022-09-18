import { Vector } from "./vector";

export const BOARD_WIDTH = 512;
export const BOARD_HEIGHT = BOARD_WIDTH / 2;

export const BOARD_PADDING = 10;

export const PADDLE_HEIGHT = 28;
export const PADDLE_WIDTH = 4;

export const PADDLE_MOVE = 5;

export const LEFT_PADDLE_X = BOARD_PADDING;
export const RIGHT_PADDLE_X = BOARD_WIDTH - BOARD_PADDING - PADDLE_WIDTH;

export const BOARD_CENTER_X = BOARD_WIDTH / 2;
export const BOARD_CENTER_Y = BOARD_HEIGHT / 2;

export const BALL_WIDTH = 4;
export const BALL_HEIGHT = 4;

export const BALL_INITIAL_DIRECTION: Vector = { x: 2, y: 0.8 };
