import { setBoard, setPosition, setRowIndex } from '@/redux/boardSlice';
import { BOARD_COL, BOARD_ROW } from '@shared/constants';
import { RootState } from '@shared/types/redux';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Key } from './Key';

const rows = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

export const Keyboard = () => {
  const board = useSelector((s: RootState) => s.board.board);
  const position = useSelector((s: RootState) => s.board.position);
  const rowIndex = useSelector((s: RootState) => s.board.rowIndex);

  const dispatch = useDispatch();

  const deleteHandle = () => {
    if (position - 1 < rowIndex * BOARD_COL) return;

    const newBoard = [...board];
    newBoard[position - 1] = '';

    dispatch(setPosition(-1));
    dispatch(setBoard(newBoard));
  };

  const enterHandle = () => {
    if (position === (rowIndex + 1) * BOARD_COL) {
      dispatch(setRowIndex(1));
    }
  };

  return (
    <div className="mt-12">
      {rows.map((row, rowIdx) => (
        <div className="flexcenter" key={rowIdx}>
          {row.split('').map((keyValue, colIdx) => (
            <Key key={colIdx} label={keyValue} />
          ))}
        </div>
      ))}

      <div className="flex flex-wrap items-center justify-center">
        <button
          className="bg-red-600 text-white px-4 py-2 m-4 rounded-[1rem]"
          onClick={deleteHandle}
        >
          Delete
        </button>
        <button
          className="bg-teal-600 text-white px-4 py-2 m-4 rounded-[1rem]"
          onClick={enterHandle}
        >
          Enter
        </button>
      </div>
    </div>
  );
};
