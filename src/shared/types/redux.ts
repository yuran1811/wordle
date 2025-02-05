export type BoardType = string[];

export interface BoardState {
  board: BoardType;
  position: number;
  rowIndex: number;
  todayWord: string;
  isEnd: boolean;
}
