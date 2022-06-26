import { MovePaddles } from "./move";

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

export type Actions = PaddleMoveAction;
