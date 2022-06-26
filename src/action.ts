import { MoveBall } from "./ball-move";
import { MovePaddles } from "./paddle-move";

export enum ActionType {
  PaddleMove = "Paddle Move",
  BallMove = "Ball Move",
}

export interface Action<T> {
  type: ActionType;
  payload: T;
}

export class PaddleMoveAction implements Action<MovePaddles> {
  public readonly type = ActionType.PaddleMove;

  constructor(public payload: MovePaddles) {}
}

export class BallMoveAction implements Action<MoveBall> {
  public readonly type = ActionType.BallMove;

  constructor(public payload: MoveBall) {}
}

export type Actions = PaddleMoveAction | BallMoveAction;
