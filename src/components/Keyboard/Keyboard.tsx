import { useEffect } from 'react';

import {
  resetState,
  setBoard,
  setEndGame,
  setPosition,
  setRowIndex,
} from '@/redux/boardSlice';
import words from '@/redux/data.json';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { BOARD_COL, BOARD_ROW } from '@shared/constants';
import Key from './Key';

const rows = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

export const Keyboard = () => {
  const { board, position, rowIndex, todayWord } = useAppSelector(
    (s) => s.board,
  );

  const dispatch = useAppDispatch();

  const thisRow = Math.floor(position / 5);
  const guessWord = board.slice(position - BOARD_COL, position).join('');

  const wordIsValid = (s: string) => words.includes(s.toLowerCase());

  const endGameCondition = (s: string) => todayWord === s.toUpperCase();

  const endGameHandle = () => {
    dispatch(setEndGame());
    alert(todayWord);
    dispatch(resetState());
  };

  const setLetter = (label: string) => {
    if (thisRow > rowIndex) return;

    const newBoard = [...board];
    newBoard[position] = label;

    dispatch(setBoard(newBoard));
    dispatch(setPosition(1));
  };

  const deleteHandle = () => {
    if (position - 1 < rowIndex * BOARD_COL) return;

    const newBoard = [...board];
    newBoard[position - 1] = '';

    dispatch(setBoard(newBoard));
    dispatch(setPosition(-1));
  };

  const deleteRowHandle = () => {
    if (position <= rowIndex * BOARD_COL) return;

    const offset =
      position -
      BOARD_COL *
        (thisRow - +(position % BOARD_COL === 0 && position / 5 > rowIndex));

    const newBoard = [...board];
    for (let i = 1; i <= offset; i++) {
      newBoard[position - i] = '';
    }

    dispatch(setBoard(newBoard));
    dispatch(setPosition(-offset));
  };

  const enterHandle = () => {
    if (position % BOARD_COL || !position) return;

    if (!wordIsValid(guessWord))
      return alert('Invalid word! Please try again.');

    if (position !== (rowIndex + 1) * BOARD_COL) return;

    dispatch(setRowIndex(1));

    if (!endGameCondition(guessWord)) {
      if (position === BOARD_COL * BOARD_ROW) endGameHandle();
    } else {
      endGameHandle();
    }
  };

  useEffect(() => {
    const ev = (e: KeyboardEvent) => {
      e.preventDefault();

      const key = e.key.toString().toLowerCase();

      if (key === 'backspace') {
        if (e.ctrlKey) deleteRowHandle();
        else deleteHandle();
        return;
      }

      if (key === 'enter') {
        enterHandle();
        return;
      }

      if (key.length !== 1 || /[^a-z]/i.test(key)) return;

      setLetter(key);
    };

    window.addEventListener('keydown', ev);

    return () => window.removeEventListener('keydown', ev);
  }, [position, rowIndex]);

  return (
    <div className="mt-8">
      {rows.map((row, rowIdx) => (
        <div className="flexcenter flex-wrap" key={rowIdx}>
          {row.split('').map((keyValue, colIdx) => (
            <Key
              key={rowIdx * BOARD_ROW + colIdx}
              label={keyValue}
              setLetter={() => setLetter(keyValue)}
            />
          ))}

          {rowIdx == 1 && (
            <button
              className="flexcenter isAnimated m-1 size-10 cursor-pointer rounded-lg bg-gray-600 p-2 font-semibold text-white hover:scale-110 disabled:opacity-40 disabled:hover:scale-100"
              onClick={() => {
                if (prompt('New game?', 'y') === 'y') endGameHandle();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M7.207 2.543a1 1 0 0 1 0 1.414L5.414 5.75h7.836a8 8 0 1 1-8 8a1 1 0 1 1 2 0a6 6 0 1 0 6-6H5.414l1.793 1.793a1 1 0 0 1-1.414 1.414l-3.5-3.5a1 1 0 0 1 0-1.414l3.5-3.5a1 1 0 0 1 1.414 0"
                />
              </svg>
            </button>
          )}
          {rowIdx == 2 && (
            <>
              <button
                className="flexcenter isAnimated m-1 size-10 cursor-pointer rounded-lg bg-yellow-600 p-2 font-semibold text-white hover:scale-110 disabled:opacity-40 disabled:hover:scale-100"
                onClick={deleteRowHandle}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M10 5h4a2 2 0 1 0-4 0M8.5 5a3.5 3.5 0 1 1 7 0h5.75a.75.75 0 0 1 0 1.5h-1.32l-1.17 12.111A3.75 3.75 0 0 1 15.026 22H8.974a3.75 3.75 0 0 1-3.733-3.389L4.07 6.5H2.75a.75.75 0 0 1 0-1.5zm2 4.75a.75.75 0 0 0-1.5 0v7.5a.75.75 0 0 0 1.5 0zM14.25 9a.75.75 0 0 0-.75.75v7.5a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75"
                  />
                </svg>
              </button>

              <button
                disabled={
                  position % 5 === 0 && Math.floor(position / 5) <= rowIndex
                }
                className="flexcenter isAnimated m-1 size-10 cursor-pointer rounded-lg bg-red-600 p-2 font-semibold text-white hover:scale-110 disabled:opacity-40 disabled:hover:scale-100"
                onClick={deleteHandle}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M18.75 4a3.25 3.25 0 0 1 3.245 3.066L22 7.25v9.5a3.25 3.25 0 0 1-3.066 3.245L18.75 20h-8.501a3.25 3.25 0 0 1-2.085-.756l-.155-.139l-4.995-4.75a3.25 3.25 0 0 1-.116-4.594l.116-.116l4.995-4.75a3.25 3.25 0 0 1 2.032-.888L10.25 4zm-7.304 4.397a.75.75 0 0 0-1.049 1.05l.073.083L12.94 12l-2.47 2.47l-.073.084a.75.75 0 0 0 1.05 1.049l.083-.073L14 13.061l2.47 2.47l.084.072a.75.75 0 0 0 1.049-1.05l-.073-.083L15.061 12l2.47-2.47l.072-.084a.75.75 0 0 0-1.05-1.049l-.083.073L14 10.939l-2.47-2.47z"
                  />
                </svg>
              </button>

              <button
                disabled={thisRow <= rowIndex}
                className="flexcenter isAnimated m-1 size-10 cursor-pointer rounded-lg bg-green-600 p-2 font-semibold text-white hover:scale-110 disabled:opacity-40 disabled:hover:scale-100"
                onClick={enterHandle}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M21 4a1 1 0 0 1 .993.883L22 5v6.5a3.5 3.5 0 0 1-3.308 3.495L18.5 15H5.415l3.292 3.293a1 1 0 0 1 .083 1.32l-.083.094a1 1 0 0 1-1.32.083l-.094-.083l-5-5a1.008 1.008 0 0 1-.097-.112l-.071-.11l-.054-.114l-.035-.105l-.025-.118l-.007-.058L2 14l.003-.075l.017-.126l.03-.111l.044-.111l.052-.098l.064-.092l.083-.094l5-5a1 1 0 0 1 1.497 1.32l-.083.094L5.415 13H18.5a1.5 1.5 0 0 0 1.493-1.356L20 11.5V5a1 1 0 0 1 1-1z"
                    fill="currentColor"
                    fillRule="nonzero"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
