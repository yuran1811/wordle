import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { randInRange } from '@/utils';
import { BOARD_COL, BOARD_ROW, DEFAULT_REDUX_STATE } from '@shared/constants';
import type { BoardType } from '@shared/types/redux';
import words from './data.json';

const boardSlice = createSlice({
  name: 'board',
  initialState: {
    ...DEFAULT_REDUX_STATE,
    todayWord: words[randInRange(0, words.length - 1)].toUpperCase(),
  },
  reducers: {
    resetState: (state) => {
      Object.assign(state, {
        ...DEFAULT_REDUX_STATE,
        todayWord: words[randInRange(0, words.length - 1)].toUpperCase(),
      });
    },
    setBoard: (state, { payload }: PayloadAction<BoardType>) => {
      state.board = payload;
    },
    setPosition: (state, { payload }: PayloadAction<number>) => {
      if (
        state.position + payload < 0 ||
        state.position + payload > BOARD_COL * BOARD_ROW
      )
        return;

      state.position += payload;
      if (state.position === BOARD_COL * BOARD_ROW) state.isEnd = true;
    },
    setRowIndex: (state, { payload }: PayloadAction<number>) => {
      if (state.rowIndex + payload > BOARD_ROW) return;
      state.rowIndex += payload;
    },
    setEndGame: (state) => {
      state.isEnd = true;
    },
  },
});

export const { resetState, setBoard, setPosition, setRowIndex, setEndGame } =
  boardSlice.actions;

export default boardSlice.reducer;
