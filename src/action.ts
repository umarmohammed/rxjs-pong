import { MoveState } from "./move-state";

export enum ActionType {
  UpdateState = "Update State",
}

export interface Action<T> {
  type: ActionType;
  payload: T;
}

export class UpdateStateAction implements Action<MoveState> {
  public readonly type = ActionType.UpdateState;

  constructor(public payload: MoveState) {}
}

export type Actions = UpdateStateAction;
