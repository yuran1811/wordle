import { resetState, setBoard, setPosition, setRowIndex } from '@/redux/boardSlice';
import { BOARD_COL, BOARD_ROW } from '@shared/constants';
import { RootState } from '@shared/types/redux';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import words from '@/redux/words.json';
import Key from './Key';

const rows = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

export const Keyboard = () => {
  const board = useSelector((s: RootState) => s.board.board);
  const position = useSelector((s: RootState) => s.board.position);
  const rowIndex = useSelector((s: RootState) => s.board.rowIndex);

  const thisRow = Math.floor(position / 5);

  const dispatch = useDispatch();

  const endGameCondition = (pattern: string) => words.includes(pattern);
  const endGameHandle = () => {
    dispatch(resetState());
  };

  const gameConditionHandle = () => {
    const guessWord = board
      .slice(position - BOARD_COL, position)
      .join('')
      .toLowerCase();

    if (endGameCondition(guessWord)) {
      alert('End game: ');
      endGameHandle();
      return true;
    }

    return false;
  };

  const deleteHandle = () => {
    if (position - 1 < rowIndex * BOARD_COL) return;

    const newBoard = [...board];
    newBoard[position - 1] = '';

    dispatch(setPosition(-1));
    dispatch(setBoard(newBoard));
  };

  const enterHandle = () => {
    if (position === (rowIndex + 1) * BOARD_COL) {
      if (!gameConditionHandle()) dispatch(setRowIndex(1));
    } else if (position === BOARD_COL * BOARD_ROW) {
      gameConditionHandle();
    }
  };

  const setLetter = (label: string) => {
    if (thisRow > rowIndex) return;

    const newBoard = [...board];
    newBoard[position] = label;

    dispatch(setBoard(newBoard));
    dispatch(setPosition(1));
  };

  const windowKeyEvent = (e: any) => {
    const key = e.key.toString();

    if (key.toLowerCase() === 'backspace') {
      deleteHandle();
      return;
    }

    if (key.toLowerCase() === 'enter') {
      enterHandle();
      return;
    }

    if (key.length !== 1 || /[^a-z]/i.test(key)) return;

    setLetter(key);
  };

  useEffect(() => {
    window.addEventListener('keydown', windowKeyEvent);

    return () => window.removeEventListener('keydown', windowKeyEvent);
  }, [position, rowIndex]);

  return (
    <div className="mt-12">
      {rows.map((row, rowIdx) => (
        <div className="flexcenter" key={rowIdx}>
          {row.split('').map((keyValue, colIdx) => (
            <Key key={colIdx} label={keyValue} setLetter={() => setLetter(keyValue)} />
          ))}
        </div>
      ))}

      <div className="flex flex-wrap items-center justify-center">
        <button
          disabled={position % 5 === 0 && Math.floor(position / 5) <= rowIndex}
          className="bg-red-600 text-white px-4 py-2 m-4 rounded-[1rem] disabled:opacity-30"
          onClick={deleteHandle}
        >
          Delete
        </button>
        <button
          disabled={thisRow <= rowIndex}
          className="bg-teal-600 text-white px-4 py-2 m-4 rounded-[1rem] disabled:opacity-30"
          onClick={enterHandle}
        >
          Enter
        </button>
      </div>
    </div>
  );
};
