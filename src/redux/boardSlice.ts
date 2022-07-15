import { createSlice } from '@reduxjs/toolkit';
import { BOARD_COL, BOARD_ROW } from '@shared/constants';

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    board: [...Array(30).fill('')],
    position: 0,
    rowIndex: 0,
    todayWord: ''
  },
  reducers: {
    setBoard: (state, action) => {
      state.board = action.payload;
    },
    setPosition: (state, { payload }) => {
      if (state.position + payload < 0 || state.position + payload >= BOARD_COL * BOARD_ROW) return;
      state.position += payload;
    },
    setRowIndex: (state, { payload }) => {
      if (state.rowIndex + payload >= BOARD_ROW) return;
      state.rowIndex += payload;
    },
  },
});

export const { setBoard, setPosition, setRowIndex } = boardSlice.actions;

export default boardSlice.reducer;
