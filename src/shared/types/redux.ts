export type BoardType = string[];

export interface BoardState {
  board: BoardType;
  position: number;
  rowIndex: number;
}

export interface RootState {
  board: BoardState;
}
