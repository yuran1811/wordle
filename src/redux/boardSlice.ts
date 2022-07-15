import { randInRange } from '@/utils';
import { createSlice } from '@reduxjs/toolkit';
import { BOARD_COL, BOARD_ROW, DEFAULT_REDUX_STATE } from '@shared/constants';
import words from './words.json';

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    board: DEFAULT_REDUX_STATE.board,
    position: DEFAULT_REDUX_STATE.position,
    rowIndex: DEFAULT_REDUX_STATE.rowIndex,
    todayWord: words[randInRange(0, words.length - 1)].toUpperCase(),
  },
  reducers: {
    resetState: (state) => {
      Object.assign(state, {
        ...DEFAULT_REDUX_STATE,
        todayWord: words[randInRange(0, words.length - 1)].toUpperCase(),
      });
    },
    setBoard: (state, action) => {
      state.board = action.payload;
    },
    setPosition: (state, { payload }) => {
      if (state.position + payload < 0 || state.position + payload > BOARD_COL * BOARD_ROW) return;
      state.position += payload;
    },
    setRowIndex: (state, { payload }) => {
      if (state.rowIndex + payload >= BOARD_ROW) return;
      state.rowIndex += payload;
    },
  },
});

export const { resetState, setBoard, setPosition, setRowIndex } = boardSlice.actions;

export default boardSlice.reducer;
