export type BoardType = string[];

export interface BoardState {
  board: BoardType;
  position: number;
  rowIndex: number;
  todayWord: string;
}

export interface RootState {
  board: BoardState;
}
