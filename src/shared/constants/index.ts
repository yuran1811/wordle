import type { BoardState, BoardType } from '@shared/types/redux';

export const BOARD_ROW = 6;
export const BOARD_COL = 5;

export const DEFAULT_REDUX_STATE: Omit<BoardState, 'todayWord'> = {
  board: [...Array(30).fill('')] as BoardType,
  position: 0,
  rowIndex: 0,
  isEnd: false,
};
