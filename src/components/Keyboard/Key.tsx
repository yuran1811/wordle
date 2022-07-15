import { setBoard, setPosition, setRowIndex } from '@/redux/boardSlice';
import { BOARD_COL, BOARD_ROW } from '@shared/constants';
import { RootState } from '@shared/types/redux';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface KeyProps {
  label: string;
}

export const Key: FC<KeyProps> = (props) => {
  const { label, ...otherProps } = props;

  const board = useSelector((s: RootState) => s.board.board);
  const position = useSelector((s: RootState) => s.board.position);
  const rowIndex = useSelector((s: RootState) => s.board.rowIndex);

  const dispatch = useDispatch();

  const setLetter = () => {
    const thisRow = Math.floor(position / 5);
    if (thisRow > rowIndex) return;

    const newBoard = [...board];
    newBoard[position] = label;

    dispatch(setBoard(newBoard));
    dispatch(setPosition(1));
  };

  return (
    <div
      {...otherProps}
      className="cursor-pointer flexcenter w-[3.8rem] h-[3.8rem] p-2 m-1 bg-transparent text-white border-[2px] border-blue-300 rounded-[1rem]"
      onClick={setLetter}
    >
      <div className="text-center">{label}</div>
    </div>
  );
};
